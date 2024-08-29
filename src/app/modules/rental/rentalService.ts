/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from "express";
import { TRental } from "./rental.interface";
import { Bike } from "../bike/bike.model";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";
import { Rental } from "./rental.model";
import getDifference from "./rental.utils";
import { initiatePayment, verifyPayment } from "../payment/payment.utils";
import { User } from "../user/user.model";


const createRentalFromDB = async(req:Request)=>{
    //extract the data
    const rentalData:TRental = req.body;
    //set user id
    rentalData.userId = req.user.userId;



    //setting up transaction
    const transactionId = `TXN-${Date.now()}`;
    rentalData.transactionId = transactionId;
    // console.log(transactionId);
    //finding user
    const user = await User.findById(req.user.userId);
    // console.log(user,'man');
    
    



    //searching the bike from the extracted data
    const bike = await Bike.findById(rentalData.bikeId);
    if(!bike){
        throw new AppError(404,'Bike not found')
    }
    // console.log('service',rentalData,rentalData.userId,bike)
    if(!bike?.isAvailable){
        throw new AppError(400,"Bike is already rented")
    };

    //implementing transaction and rollback as there is two database write operation
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //while renting the isAvailable status should be updated to false
        //first session
        const updateAvailability = await Bike.findByIdAndUpdate(rentalData.bikeId, {isAvailable:false}, {new:true,session});
        if(!updateAvailability){
            throw new AppError(500,'Error updating isAvailable status')
        }
        //second session
        const instance = new Rental(rentalData);            //had to do it with instance method to not passing the req.body in an array 
        instance.$session(session);
        const result = await instance.save();               //saving to database

        //payment
        const paymentData = {
            transactionId,
            amount: 100,
            customerName:user?.name,
            customerEmail: user?.email,
            customerPhone: user?.phone,
            customerAddress: user?.address,
        };
        // console.log(paymentData, 'backend')
        const paymentSession = await initiatePayment(paymentData);
        // console.log(paymentSession);


        if(!result){
            throw new AppError(500,'Error creating a rental')
        }
        //after being successful we need to commit the transaction and return the result
        await session.commitTransaction();
        await session.endSession();
        return {
            result,
            paymentSession,
        }
    } catch (error) {
        //if any error occurs we will abort the transaction and return an error response
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(500, 'Error creating a rental')
    }
};

const returnRentalIntoDB = async(id:string)=>{
    const borrowedBike = await Rental.findById(id);
    //checking if the rental is exist or not
    if(!borrowedBike){
        throw new AppError(404,'Rental not found');
    } 
    //searching the bike which is rented
    const bike = await Bike.findById(borrowedBike?.bikeId);
    if(!bike){
        throw new AppError(404,'Bike not found');
    }

    //transaction and rollback as there is two database write operation
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //set the iso dates
        const startTime = new Date(borrowedBike.startTime);
        const returnTime = new Date();

        //calculation part
        const totalCost = getDifference(startTime,returnTime) * (bike?.pricePerHour as number);
        //session one
        const rentalReturn = await Rental.findByIdAndUpdate( id, {returnTime:returnTime, totalCost:totalCost, isReturned:true }, {new:true,session});
        //session two
        const updateAvailability = await Bike.findByIdAndUpdate(borrowedBike?.bikeId, { isAvailable:true}, {new:true,session});
        //commit the transaction
        await session.commitTransaction();
        await session.endSession();
        return rentalReturn;
    } catch (error) {
        //if there is any error abort the transaction
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(500,'Error returning bike')
    }
};

const getAllRentalFromDB = async (req:Request)=>{
    const me = req.user;
    const result = await Rental.find({userId:me.userId}).populate('userId').populate('bikeId');

    const transactionId = `TXN-${Date.now()}`;

    

    const paymentData = {
        transactionId,
        amount: 1000,
        customerName:me?.name,
        customerEmail: me?.email,
        customerPhone: me?.phone,
        customerAddress: me?.address,
    };

    // console.log(paymentData,'backend')
    // console.log(paymentData, 'backend')
    const paymentSession = await initiatePayment(paymentData);
    // console.log(paymentSession,'payment session');

    const verifyResponse = await verifyPayment(transactionId);
    // console.log(verifyResponse, 'verify response');



    


    return {
        result,
        paymentSession,
    };
}

const rentalsFromDB = async() => {
    const result = await Rental.find().populate('userId').populate('bikeId');
    return result;
}

const payRentals = async(req:Request) =>{

    const transactionId = `TXN-${Date.now()}`;

    const me = req.user;

    const paymentData = {
        transactionId,
        amount: 100,
        customerName:me?.name,
        customerEmail: me?.email,
        customerPhone: me?.phone,
        customerAddress: me?.address,
    };

    // console.log(paymentData)
    // console.log(paymentData, 'backend')
    const paymentSession = await initiatePayment(paymentData);
    // console.log(paymentSession);

    return paymentSession;

}

export const RentalServices = {
    createRentalFromDB,
    returnRentalIntoDB,
    getAllRentalFromDB,
    rentalsFromDB,
    payRentals,
}