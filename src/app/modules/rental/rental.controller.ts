import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalServices } from "./rentalService";

const createRental = catchAsync(async(req,res)=>{
    const result = await RentalServices.createRentalFromDB(req);
    console.log(result);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Rental created successfully",
        data:result,
    });

});

export const RentalControllers = {
    createRental,
}