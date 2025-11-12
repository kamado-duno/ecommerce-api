import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product.js";
import { Category } from "../models/Category.js";

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: any = {};
    if (req.query.categoryId) filter.categoryId = req.query.categoryId;
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(400).json({ message: "categoryId does not exist" });
    const product = await Product.create({
      name,
      description,
      price,
      categoryId,
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    if (data.categoryId) {
      const cat = await Category.findById(data.categoryId);
      if (!cat)
        return res.status(400).json({ message: "categoryId does not exist" });
    }
    const p = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
