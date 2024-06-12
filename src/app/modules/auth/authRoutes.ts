import express from 'express';
import validate from '../../middlewares/validate';
import { userValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post(
    '/signup',
    validate(userValidations.createUserZod),
    AuthControllers.signUp
);

export const AuthRoutes = router; 