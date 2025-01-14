import { z } from "zod";

const signUpSchema = z.object({
  name: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  confirmPassword: z.string().min(8).max(20),
  phoneNumber: z.string().min(10).max(10),
});

const otpSchema = z.object({
  otp: z.string().min(6).max(6),
});

export const authSchemas = {
  signUpSchema,
  otpSchema,
};
