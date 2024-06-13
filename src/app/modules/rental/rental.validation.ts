import { z } from "zod";

const createRentalZod = z.object({
    body: z.object({
        userId: z.string().optional(), 
        bikeId: z.string(),
        startTime: z.string(), 
        returnTime: z.string().nullable().optional(),
        totalCost: z.number().optional().default(0),
        isReturned: z.boolean().optional().default(false),
    }),
});

export const RentalValidations = {
    createRentalZod,
}

// z.object({
//     userId: z.string({required_error:'UserID is required'}).refine((id) => id.match(/^[0-9a-fA-F]{24}$/), { message: "Invalid User ID" }),
//     bikeId: z.string({required_error:'BikeID is required'}).refine((id) => id.match(/^[0-9a-fA-F]{24}$/), { message: "Invalid Bike ID" }),
//     startTime: z.date({ required_error: "Start time is required" }),
//     returnTime: z.date().optional(),
//     totalCost: z.number({required_error:'Total cost is required'}).positive({ message: "Total cost must be a positive number" }),
//     isReturned: z.boolean({required_error:'is returned is required'}).optional().default(false),
// }),