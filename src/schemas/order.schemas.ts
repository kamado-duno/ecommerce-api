import { z } from "zod";
import { Types } from "mongoose";

const orderProduct = z.object({
  productId: z.string().refine((v) => Types.ObjectId.isValid(v)),
  quantity: z.number().int().min(1),
});

export const createOrderSchema = z.object({
  body: z.object({
    userId: z.string().refine((v) => Types.ObjectId.isValid(v)),
    products: z.array(orderProduct).min(1),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    products: z.array(orderProduct).min(1).optional(),
  }),
  params: z.object({ id: z.string().refine((v) => Types.ObjectId.isValid(v)) }),
});

export const getOrderParams = z.object({
  params: z.object({ id: z.string().refine((v) => Types.ObjectId.isValid(v)) }),
});
