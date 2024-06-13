import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalServices } from "./rentalService";

const createRental = catchAsync(async(req,res)=>{
    const result = await RentalServices.createRentalFromDB(req);        //only using req will extract the user data
    console.log(result);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Rental created successfully",
        data:result,
    });

});

const returnRental = catchAsync(async(req,res)=>{
    const { id } = req.params;
    const result = await RentalServices.returnRentalIntoDB(id);
    console.log('controller', id, result);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Bike returned successfully",
        data:result,
    });
});

const getAllRental = catchAsync(async(req,res)=>{
    const result = await RentalServices.getAllRentalFromDB();
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Rentals retrieved successfully",
        data:result,
    });
});

export const RentalControllers = {
    createRental,
    returnRental,
    getAllRental,
}