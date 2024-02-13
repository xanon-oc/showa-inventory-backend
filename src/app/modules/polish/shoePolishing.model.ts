import { Schema, model } from 'mongoose';
import { ShoePolishModel, ShoePolishRequest } from './shoePolishing.interface';

// Define the mongoose schema for the shoe polishing service request
const ShoePolishRequestSchema = new Schema<ShoePolishRequest, ShoePolishModel>({
  userId: { type: String, required: true },
  requestDate: { type: Date, default: Date.now, required: true },
  preferences: {
    polishType: { type: String, enum: ['regular', 'premium'], required: true },
    shineLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
    },
    instructions: { type: String },
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending',
    required: true,
  },
});

// checking if the shoe exists in the DB

ShoePolishRequestSchema.statics.isShoePolishExists = async function (
  shoeId: string,
) {
  return await ShoePolish.findById(shoeId);
};

export const ShoePolish = model<ShoePolishRequest, ShoePolishModel>(
  'ShoePolishRequest',
  ShoePolishRequestSchema,
);
