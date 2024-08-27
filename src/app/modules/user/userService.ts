import { Request } from "express";
import { User } from "./user.model";
import AppError from "../../errors/AppError";

const GetProfileFromDB = async (req:Request) => {
    //getting the extracted data from decoded token
    const user = req.user;     
    //searching by id which can be achieved from decoded token
    const findUser = await User.findById(user?.userId);
    // console.log('service' ,findUser);
    if(!findUser){
        throw new AppError(404,'User not found');
    }
    return findUser;
};


const UpdateProfileIntoDB = async(req:Request)=>{
    //getting the data from token
    const user = req.user;
    const updatedData = req.body;
    const findUser = await User.findById(user?.userId);
    // console.log('service', findUser)

    //checking if the user exist
    if(!findUser){
        throw new AppError(404, 'User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(user?.userId, updatedData, {new:true}).select('-createdAt -updatedAt -__v');
    if(!updatedUser){
        throw new AppError(404, 'Error updating user')
    }

    return updatedUser;
};

const GetAllUsersFromDB = async() =>{
    const result = await User.find({role: 'user'});
    return result;
};

const PromoteUserToAdminInDB = async (id: string) => {
    const user = await User.findById(id);
    //checking if the user exist in the database
    if(!user){
        throw new AppError(404, 'User not found');
    };

    //setting user role to admin
    user.role = 'admin';
    await user.save();
    return user;
};

const DeleteUserFromDB = async (id: string) => {
    const user = await User.findById(id);
    //checking if the user exist in the database
    if(!user){
        throw new AppError(404, 'User not found');
    };

    const result = await User.findByIdAndDelete(id);
    return result;
} 



export const UserServices = {
    GetProfileFromDB,
    UpdateProfileIntoDB,
    GetAllUsersFromDB,
    PromoteUserToAdminInDB,
    DeleteUserFromDB,
}