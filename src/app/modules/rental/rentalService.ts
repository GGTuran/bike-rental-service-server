import { Request } from "express";
import { TRental } from "./rental.interface";
import { Bike } from "../bike/bike.model";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";
import { Rental } from "./rental.model";

const createRentalFromDB = async(req:Request)=>{
    const rental:TRental = req.body;
    rental.userId = req.user.userId;
    const bike = await Bike.findById(rental.bikeId);
    console.log('service',rental,rental.userId,bike)
    if(!bike?.isAvailable){
        throw new AppError(400,"Bike is already rented")
    };

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const updateAvailability = await Bike.findByIdAndUpdate(rental.bikeId, {isAvailable:false}, {new:true,session});
        if(!updateAvailability){
            throw new AppError(500,'Error updating isAvailable status')
        }
        //cerate a rental
        const result = await Rental.create([req.body], {session:session});
        if(!result){
            throw new AppError(500,'Error creating a rental')
        }
        await session.commitTransaction();
        await session.endSession();
        return result;
    } catch (error) {
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
    const bike = await Bike.findById(borrowedBike?.bikeId);

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        //set the iso dates
        const startTime = new Date(borrowedBike.startTime);
        const returnTime = new Date();

        //calculation part
        const duration = Math.ceil((returnTime.getTime() - startTime.getTime())/(1000 * 60 * 60 * 60));
        // const hours = duration/(1000 * 60 *60);
        const totalCost = duration * (bike?.pricePerHour as number);

        const rentalReturn = await Rental.findByIdAndUpdate( id, {returnTime:returnTime, totalCost:totalCost, isReturned:true }, {new:true,session});

        const updateAvailability = await Bike.findByIdAndUpdate(borrowedBike?.bikeId, { isAvailable:true}, {new:true,session});

        await session.commitTransaction();
        await session.endSession();
        return rentalReturn;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(500,'Error returning bike')
    }
};

const getAllRentalFromDB = async ()=>{
    const result = await Rental.find();
    return result;
}

export const RentalServices = {
    createRentalFromDB,
    returnRentalIntoDB,
    getAllRentalFromDB,
}