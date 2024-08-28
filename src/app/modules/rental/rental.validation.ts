import { z } from "zod";

const createRentalZod = z.object({
    body: z.object({
        userId: z.string().optional(), 
        bikeId: z.string(),
        startTime: z.string(), 
        returnTime: z.string().nullable().optional(),
        totalCost: z.number().optional().default(0),
        isReturned: z.boolean().optional().default(false),
        transactionId: z.string().optional(),
    }),
});

export const RentalValidations = {
    createRentalZod,
};