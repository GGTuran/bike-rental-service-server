import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./authService";

const signUp = catchAsync(async(req,res)=>{
    const result = await AuthServices.signUp(req.body);
    sendResponse(res,{
        success:true,
        statusCode:201,
        message:"User registered successfully",
        data:result,
    });
});

export const AuthControllers = {
    signUp,
}