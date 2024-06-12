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

export const RentalServices = {
    createRentalFromDB,
}