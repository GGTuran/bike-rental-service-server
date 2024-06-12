import { z } from "zod";
import { USER_ROLE } from "./user.constants";

const createUserZod = z.object({
    body: z.object({
      name: z.string({ required_error: 'Name is required' }),
      email: z.string({ required_error: 'Email is required' }).email({message: "Invalid email"}),
      password: z.string({ required_error: 'Password is required' }),
      phone: z.string({ required_error: 'Phone Number is required' }),
      role: z.nativeEnum(USER_ROLE),
      address: z.string({ required_error: 'Address is required' }),
    }),
  });
  
  export const userValidations = {
    createUserZod,
  };
  