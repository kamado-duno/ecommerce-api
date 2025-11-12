import { Request, Response, NextFunction } from "express";
import { Order } from "../models/Order.js";
import { User } from "../models/User.js";
import { Product } from "../models/Product.js";
import mongoose from "mongoose";

const calculateTotalAndSnapshot = async (
  items: { productId: string; quantity: number }[]
) => {
  const productIds = items.map((i) => i.productId);
  const products = await Product.find<
    mongoose.Document & { _id: mongoose.Types.ObjectId }
  >({ _id: { $in: productIds } });
  const productMap: Record<string, any> = {};
  for (const p of products) productMap[p._id.toString()] = p;

  let total = 0;
  const snapshot = items.map((it) => {
    const pdoc = productMap[it.productId];
    if (!pdoc)
      throw { status: 400, message: `Product ${it.productId} not found` };
    const price = pdoc.price;
    const sub = price * it.quantity;
    total += sub;
    return {
      productId: new mongoose.Types.ObjectId(it.productId),
      quantity: it.quantity,
      priceAtPurchase: price,
    };
  });

  return { total, snapshot };
};

export const getOrders = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, products } = req.body;
    const user = await User.findById(userId);
    if (!user)
      return res.status(400).json({ message: "userId does not exist" });

    const { total, snapshot } = await calculateTotalAndSnapshot(products);

    const order = await Order.create({
      userId,
      products: snapshot,
      total,
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (payload.products) {
      const { total, snapshot } = await calculateTotalAndSnapshot(
        payload.products
      );
      order.products = snapshot;
      order.total = total;
    }

    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
