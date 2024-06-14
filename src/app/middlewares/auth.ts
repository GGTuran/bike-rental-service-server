import config from "../config";
import { TUserRoles } from "../modules/user/user.interface";
import catchAsync from "../utils/catchAsync"
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (...requiredRoles:TUserRoles[]) =>{
    return catchAsync(async(req,res,next)=>{

        let token; 
        //because of  adding Bearer in the token,we need to split it for authorization
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){    
            token = req.headers.authorization.split(' ')[1];
        }

        //checking if the token is given or not 
        if(!token){
            // throw new Error()
            res.status(404).json({
                success:false,
                statusCode:401,
                message:"You have no access to this route"
            })
        }


        const decoded = jwt.verify(
            token as string,
            config.JWT_ACCESS_SECRET as string,
        ) as JwtPayload;

        req.user = decoded;
        // const { role, userId, iat } = decoded;


        if ( !requiredRoles.includes(req.user.role)) {
            // throw new AppError(401, 'You have no access to this route');
            res.status(404).json({
                success:false,
                statusCode:401,
                message:"You have no access to this route"
            })
        }


        next();
    });
};

export default auth;