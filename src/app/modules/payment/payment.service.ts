/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from "path";
// import { Rental } from "../rental/rental.model";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { Rental } from "../rental/rental.model";

const PaymentIntoDB = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);
    console.log(verifyResponse);

    let message = "";

let updateStatus;
  

    console.log(verifyResponse.amount,'amount')


    

 if (verifyResponse && verifyResponse.pay_status === 'Successful'  ) {
       
        message = "Successfully Paid!"
      
    }
   
   
    else {
        message = "Payment Failed!"
    }

    const filePath = join(__dirname, '../../../../confirmation.html');
    let template = readFileSync(filePath, 'utf-8')

    template = template.replace('{{message}}', message)
    

    return template;
}

export const PaymentServices = {
    PaymentIntoDB,
}