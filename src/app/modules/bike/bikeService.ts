import { TBike } from "./bike.interface";
import { Bike } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
    const result = await Bike.create(payload);
    return result;
};

const getAllBikeFromDB = async () => {
    const result = await Bike.find();
    return result;
};

const updateBikeIntoDB = async(id:string , payload:Partial<TBike>)=>{
    const result = await Bike.findByIdAndUpdate({_id:id}, payload, {new:true});
    console.log('service',result)
    return result;
}

const deleteBikeFromDB = async(id:string)=>{
    const updateAvailability = await Bike.findByIdAndUpdate({_id:id}, {isAvailable:false}, {new:true});
    const result = await Bike.findByIdAndDelete(id);
    return result;
}

export const BikeServices = {
    createBikeIntoDB,
    getAllBikeFromDB,
    updateBikeIntoDB,
    deleteBikeFromDB,
}