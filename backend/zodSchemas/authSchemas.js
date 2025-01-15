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

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z.object({
  otp: z.string().min(6).max(6),
  userId: z.string(),
  password: z.string().min(8).max(20),
});

const changePasswordSchema = z.object({
  password: z.string().min(8).max(20),
  newPassword: z.string().min(8).max(20),
});

export const authSchemas = {
  signUpSchema,
  otpSchema,
  signInSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
};
