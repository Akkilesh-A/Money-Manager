import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(3).max(30).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).max(10).optional(),
  userId: z.string().optional(),
});

export const userSchemas = { updateProfileSchema };
