import { Request, Response } from "express";

const confirmationController = async (req: Request, res: Response) => {
    res.send(`<h1>Payment successful
        return to  <a
            href="http://localhost:5173/"
          >Home</a>
        </h>`)
};

export const PaymentControllers = {
    confirmationController,
}