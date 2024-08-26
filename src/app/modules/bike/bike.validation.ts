import { z } from "zod";

const createBikeZod = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        description: z.string({ required_error: 'Description is required' }),
        pricePerHour: z.number({ required_error: 'Price per hour is required' }).positive({ message: "Price per hour must be a positive number" }),
        isAvailable: z.boolean({ required_error: 'isAvailable status is required' }).optional().default(true),
        image:z.string({required_error: 'Bike image is required'}),
        cc: z.number({ required_error: 'CC is required' }).positive({ message: "Engine capacity (cc) must be a positive number" }),
        year: z.number({ required_error: 'Year is required' }).int().positive({ message: "Year must be a positive integer" }),
        model: z.string({ required_error: 'Model is required' }),
        brand: z.string({ required_error: 'Brand is required' }),
    }),
});


const updateBikeZod = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }).optional(),
        description: z.string({ required_error: 'Description is required' }).optional(),
        pricePerHour: z.number({ required_error: 'Price per hour is required' }).positive({ message: "Price per hour must be a positive number" }).optional(),
        isAvailable: z.boolean({ required_error: 'isAvailable status is required' }).optional().default(true).optional(),
        image:z.string({required_error: 'Bike image is required'}).optional(),
        cc: z.number({ required_error: 'CC is required' }).positive({ message: "Engine capacity (cc) must be a positive number" }).optional(),
        year: z.number({ required_error: 'Year is required' }).int().positive({ message: "Year must be a positive integer" }).optional(),
        model: z.string({ required_error: 'Model is required' }).optional(),
        brand: z.string({ required_error: 'Brand is required' }).optional(),
    }),
});

export const BikeValidations = {
    createBikeZod,
    updateBikeZod,
}