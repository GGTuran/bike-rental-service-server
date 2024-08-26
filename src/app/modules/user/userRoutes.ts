import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constants';

const router = express.Router();

router.get(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.user),
    UserControllers.GetProfile
);

router.patch(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.user),
    UserControllers.UpdateProfile
);


export const UserRoutes = router;