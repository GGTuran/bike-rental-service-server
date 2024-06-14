import {  TErrorMessages, TGenericErrorResponse } from "../interface/error";

const handleDUplicateError = (err:any):TGenericErrorResponse =>{
    const match = err.message.match(/"([^"]*)"/);


    const extractedMessage = match && match[1];

    const errorMessages:TErrorMessages = [
        {
            path:'',
            message:`${extractedMessage} is already exists`,
        },
    ];

    const statusCode = 400;
    return{
        statusCode,
        message:err.errorResponse.errmsg,
        errorMessages,
    };
};

export default handleDUplicateError;