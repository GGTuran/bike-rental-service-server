import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate = (schema:AnyZodObject)=>{
    return async(req:Request, res:Response, next:NextFunction)=>{
        try {
            //validate it
            await schema.parseAsync({
                body: req.body,
                cookies:req.cookies,
            });
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validate;