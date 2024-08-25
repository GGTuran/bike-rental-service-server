/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errors/AppError";
import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
    const result = await Bike.create(payload);
    return result;
};

const getAllBikeFromDB = async () => {
    const result = await Bike.find().select('-__v');
    return result;
};

const getSingleBikeFromDB = async(id: string) => {
    const result = await Bike.findById(id);
    return result;
}

const updateBikeIntoDB = async(id:string , payload:Partial<TBike>)=>{
    const bike = await Bike.findById(id);
    //if bike doesn't exist in database throwing an error
    if(!bike){
        throw new AppError(404,'Bike not found')
    }
    const result = await Bike.findByIdAndUpdate({_id:id}, payload, {new:true});
    // console.log('service',result)
    return result;
}

const deleteBikeFromDB = async(id:string)=>{
    const bike = await Bike.findById(id);
       //if bike doesn't exist in database throwing an error
    if(!bike){
        throw new AppError(404,'Bike not found')
    }
    //updating the bike info for returning it as a response to the client
    const updateAvailability = await Bike.findByIdAndUpdate({_id:id}, {isAvailable:false}, {new:true});
    const result = await Bike.findByIdAndDelete(id);
    return result;
}

export const BikeServices = {
    createBikeIntoDB,
    getAllBikeFromDB,
    getSingleBikeFromDB,
    updateBikeIntoDB,
    deleteBikeFromDB,
}