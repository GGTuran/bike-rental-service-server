import { Router } from "express";
import { PaymentControllers } from "./payment.controller";

const router = Router();

router.post('/confirmation', PaymentControllers.confirmationController);

export const PaymentRoutes = router;