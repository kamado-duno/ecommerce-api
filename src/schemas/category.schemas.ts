import { z } from "zod";
import { Types } from "mongoose";

export const createCategorySchema = z.object({
  body: z.object({ name: z.string().min(1) }),
});

export const updateCategorySchema = z.object({
  body: z.object({ name: z.string().min(1).optional() }),
  params: z.object({ id: z.string().refine((v) => Types.ObjectId.isValid(v)) }),
});

export const getCategoryParams = z.object({
  params: z.object({ id: z.string().refine((v) => Types.ObjectId.isValid(v)) }),
});
