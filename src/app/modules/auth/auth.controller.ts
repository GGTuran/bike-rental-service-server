import config from "../../config";
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
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'User logged in successfully',
        token:token,
        data:user,
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
    });
})

export const AuthControllers = {
    signUp,
    login,
    refreshToken,
}