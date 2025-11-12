import { Schema, model, Document, Types } from "mongoose";

export interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number; // added field to store price at the time of purchase
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  products: IOrderProduct[];
  total: number;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true }, // store price at purchase time
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete (ret as any).__v;
    return ret;
  },
});

export const Order = model<IOrder>("Order", orderSchema);
