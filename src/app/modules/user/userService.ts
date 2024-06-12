import { Request } from "express";
import { User } from "./user.model";
import AppError from "../../errors/AppError";

const GetProfileFromDB = async (req:Request) => {
    const user = req.user;
    const findUser = await User.findById(user?.userId);
    console.log('service' ,findUser);
    if(!findUser){
        throw new AppError(404,'User not found');
    }
    return findUser;
};


const UpdateProfileIntoDB = async(req:Request)=>{
    const user = req.user;
    const updatedData = req.body;
    const findUser = await User.findById(user?.userId);
    console.log('service', findUser)

    //checking if the user exist
    if(!findUser){
        throw new AppError(404, 'User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(user?.userId, updatedData, {new:true});
    if(!updatedUser){
        throw new AppError(404, 'Error updating user')
    }

    return updatedUser;
}

export const UserServices = {
    GetProfileFromDB,
    UpdateProfileIntoDB
}