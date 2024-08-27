/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errors/AppError";

function getDifference(startDate : any, endDate:any):number{
    if(!startDate || !endDate){
        throw new AppError(500,'Invalid startDate or endDate!!');
    }
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const difference = endTime - startTime;
    const differenceInHours = Math.ceil(difference/(1000*60*60))
    return differenceInHours;
};

export default getDifference;

