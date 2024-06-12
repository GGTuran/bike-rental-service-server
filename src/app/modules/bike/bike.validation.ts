import { z } from "zod";

const createBikeZod = z.object({
    body:z.object({
        name: z.string({required_error:  'Name is required'}),
        description: z.string({required_error: 'Description is required'}),
        pricePerHour: z.number({required_error:'Price per hour is required'}).positive({ message: "Price per hour must be a positive number" }),
        isAvailable: z.boolean({required_error:'isAvailable status is required'}).optional().default(true),
        cc: z.number({required_error:'CC is required'}).positive({ message: "Engine capacity (cc) must be a positive number" }),
        year: z.number({required_error:'Year is required'}).int().positive({ message: "Year must be a positive integer" }),
        model: z.string({required_error:'Model is required'}),
        brand: z.string({required_error:'Brand is required'}),
    }),
});

export const BikeValidations = {
    createBikeZod,
}