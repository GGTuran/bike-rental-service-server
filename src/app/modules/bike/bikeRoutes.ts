import express from 'express';
import validate from '../../middlewares/validate';
import { BikeValidations } from './bike.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constants';
import { BikeControllers } from './bike.controller';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    validate(BikeValidations.createBikeZod),
    BikeControllers.createBike
);

export const BikeRoutes = router;