import express from 'express';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { RentalValidations } from './rental.validation';
import { RentalControllers } from './rental.controller';
import { USER_ROLE } from '../user/user.constants';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.user),
    validate(RentalValidations.createRentalZod),
    RentalControllers.createRental,
);

router.put(
    '/:id/return',
    auth(USER_ROLE.admin),
    RentalControllers.returnRental
);

router.get(
    '/',
    auth(USER_ROLE.user),
    RentalControllers.getAllRental
);

export const RentalRoutes = router;