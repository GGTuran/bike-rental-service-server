import { Router } from "express";
import { AuthRoutes } from "../modules/auth/authRoutes";
import { UserRoutes } from "../modules/user/userRoutes";
import { BikeRoutes } from "../modules/bike/bikeRoutes";

const router = Router();

const moduleRoutes = [
    {
        path:'/users',
        route:UserRoutes,
    },
    {
        path:'/auth',
        route:AuthRoutes,
    },
    {
        path:'/bikes',
        route:BikeRoutes,
    },
];

moduleRoutes.forEach((route)=> router.use(route.path,route.route));

export default router;