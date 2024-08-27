import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./userService";

const GetProfile = catchAsync(async(req, res)=>{
    const result = await UserServices.GetProfileFromDB(req);        //only sending req will extract the data and give to client
    
    // console.log('controller',result);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'User profile retrieved successfully',
        data:result,
    });
});

const UpdateProfile = catchAsync(async(req,res)=>{
    const result = await UserServices.UpdateProfileIntoDB(req);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'Profile updated successfully',
        data:result
    });
});

const GetAllUsers = catchAsync(async(req, res) =>{
    const result = await UserServices.GetAllUsersFromDB();
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'User profiles retrieved successfully',
        data:result,
    });
});

const PromoteUserToAdmin = catchAsync(async (req, res) =>{
    const { id } = req.params;
    const result = await UserServices.PromoteUserToAdminInDB(id);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'Profile updated successfully',
        data:result
    });

});

const DeleteUser = catchAsync(async(req,res)=>{
    const { id } = req.params;
    const result = await UserServices.DeleteUserFromDB(id);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"User deleted successfully",
        data:result,
    })
})

export const UserControllers = {
    GetProfile,
    UpdateProfile,
    GetAllUsers,
    PromoteUserToAdmin,
    DeleteUser,
}