import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./userService";

const GetProfile = catchAsync(async(req, res)=>{
    const result = await UserServices.GetProfileFromDB(req);
    // if(){}
    console.log('controller',result);
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
        message:'User profile updated successfully',
        data:result
    });
});

export const UserControllers = {
    GetProfile,
    UpdateProfile,
}