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

export const UserControllers = {
    GetProfile,
    UpdateProfile,
}