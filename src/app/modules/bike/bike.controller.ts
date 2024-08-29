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

const getAllBike = catchAsync(async(req,res)=>{

    const searchTerm = req.query.searchTerm as string;

    const result = await BikeServices.getAllBikeFromDB(searchTerm);
    //if there is no bike in the database
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
        message:"Bikes retrieved successfully",
        data:result,
    });
});

const getSingleBike = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await BikeServices.getSingleBikeFromDB(id);
    sendResponse(res, {
        success:true,
        statusCode:200,
        message:"Bike retrieved successfully",
        data:result,
    });
});

const updateBike = catchAsync(async(req,res)=>{
    const { id } = req.params;
    // console.log(req.params);
    const updatedData = req.body;
    const result = await BikeServices.updateBikeIntoDB( id, updatedData);
    // console.log('controller', id,updatedData,result);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Bike updated successfully",
        data:result,
    });
});

const deleteBike = catchAsync(async(req,res)=>{
    const { id } = req.params;
    const result = await BikeServices.deleteBikeFromDB(id);
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Bike deleted successfully",
        data:result,
    })
})

export const BikeControllers = {
    createBike,
    getAllBike,
    getSingleBike,
    updateBike,
    deleteBike,
}