import { z } from "zod";

const createTransactionSchema = z.object({
  amount: z.number().min(1),
  description: z.string().min(1),
  tag: z.string().min(1),
  imgURL: z.string().optional(),
  userId: z.string().optional(),
  to: z.string().optional(),
});

export const transactionZodSchemas = {
  createTransactionSchema,
};
