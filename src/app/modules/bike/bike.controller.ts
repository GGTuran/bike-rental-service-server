import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeServices } from "./bikeService";

const createBike = catchAsync(async(req,res)=>{
    const result = await BikeServices.createBikeIntoDB(req.body);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:'Bike added successfully',
        data:result,
    });
});

export const BikeControllers = {
    createBike,
}