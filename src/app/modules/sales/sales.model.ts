import { Schema, model } from 'mongoose';
import { TSale } from './sales.interface';

const SalesSchema = new Schema<TSale>({
  productId: { type: Schema.Types.ObjectId, ref: 'Shoe' },
  quantity: { type: Number },
  buyerName: { type: String },
  saleDate: { type: String },
});

export const Sales = model<TSale>('Sales', SalesSchema);
