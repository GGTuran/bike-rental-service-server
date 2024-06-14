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
    const result = await RentalServices.getAllRentalFromDB(req);
    console.log('controller get all rental',req);
    if(result.length === 0){
        return res.status(404).json({
            success:false,
            message:"No Data Found",
            data:[]
        });
    }
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