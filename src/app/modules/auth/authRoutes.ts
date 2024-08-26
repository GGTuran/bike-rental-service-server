import express from 'express';
import validate from '../../middlewares/validate';
import { userValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
    '/signup',
    validate(userValidations.createUserZod),
    AuthControllers.signUp
);

router.post(
    '/login',
    validate(AuthValidation.loginZod),
    AuthControllers.login
);

router.post(
    '/refresh-token',
    AuthControllers.refreshToken,
)

export const AuthRoutes = router; 