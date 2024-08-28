import { Request, Response } from "express";
import { PaymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
    const { transactionId, status } = req.query;

    const result = await PaymentServices.PaymentIntoDB(transactionId as string, status as string);
    res.send(result);
};


const payment = async (req: Request, res: Response) => {
    const { transactionId, status } = req.query;

    const result = await PaymentServices.PaymentIntoDB(transactionId as string, status as string);
    res.send(result)
};

export const PaymentControllers = {
    confirmationController,
    payment,
}
