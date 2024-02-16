import { ShoeColor, ShoeSize, ShoeStyle } from './shoes.constant';
import { ShoeModel, TShoe } from './shoes.interface';
import { Schema, model } from 'mongoose';

const ShoeSchema = new Schema<TShoe, ShoeModel>(
  {
    shoeId: { type: String, unique: true },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    releaseDate: { type: String },
    brand: { type: String },
    style: { type: String, enum: ShoeStyle },
    model: { type: String },
    size: { type: String, enum: ShoeSize },
    color: { type: String, enum: ShoeColor },
    material: { type: String, enum: ['leather', 'fabric'] },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

// checking if the shoe exists in the DB

ShoeSchema.statics.isShoeExists = async function (shoeId: string) {
  return await Shoe.findById(shoeId);
};

export const Shoe = model<TShoe, ShoeModel>('Shoe', ShoeSchema);
