import { z } from "zod";
import { Types } from "mongoose";

export const createUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
  }),
  params: z.object({
    id: z
      .string()
      .refine((v) => Types.ObjectId.isValid(v), { message: "Invalid id" }),
  }),
});

export const getUserParams = z.object({
  params: z.object({
    id: z
      .string()
      .refine((v) => Types.ObjectId.isValid(v), { message: "Invalid id" }),
  }),
});
