import { z } from "zod";
import { Types } from "mongoose";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().nonnegative(),
    categoryId: z.string().refine((v) => Types.ObjectId.isValid(v)),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    categoryId: z
      .string()
      .optional()
      .refine((v) => (v ? Types.ObjectId.isValid(v) : true)),
  }),
  params: z.object({ id: z.string().refine((v) => Types.ObjectId.isValid(v)) }),
});

export const getProductParams = z.object({
  params: z.object({ id: z.string().refine((v) => Types.ObjectId.isValid(v)) }),
});
