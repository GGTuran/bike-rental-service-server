import { z } from "zod";

const loginZod = z.object({
    body: z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email' }),
      password: z.string({ required_error: 'password is required' }),
    }),
  });

  export const AuthValidation = {
    loginZod,
  }
  