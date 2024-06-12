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

const login = catchAsync(async(req,res)=>{
    const { token , user} = await AuthServices.loginUser(req.body);

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'User logged in successfully',
        token:token,
        data:user,
    });
});

export const AuthControllers = {
    signUp,
    login,
}