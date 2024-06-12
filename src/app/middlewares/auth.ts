import config from "../config";
import AppError from "../errors/AppError";
import { TUserRoles } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles:TUserRoles[]) =>{
    return catchAsync(async(req,res,next)=>{

        let token; 

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }

        //checking if the token is given or not 
        if(!token){
            throw new AppError(401,'You are not authorized')
        }


        const decoded = jwt.verify(
            token,
            config.JWT_ACCESS_SECRET as string,
        ) as JwtPayload;

        req.user = decoded;
        // const { role, userId, iat } = decoded;


        if (requiredRoles && !requiredRoles.includes(req.user.role)) {
            throw new AppError(401, 'You are not authorized!');
        }


        next();
    });
};

export default auth;