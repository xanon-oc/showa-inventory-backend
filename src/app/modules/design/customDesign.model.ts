import { Schema, model } from 'mongoose';
import { TCustomShoeDesign } from './customDesign.interface';

const CustomShoeDesignSchema = new Schema<TCustomShoeDesign>({
  userId: { type: String, required: true },
  designName: { type: String, required: true },
  customization: {
    colors: { type: String, required: true },
    patterns: { type: String, required: true },
    material: { type: String, enum: ['Leather', 'fabric'], required: true },
    customFeatures: { type: String, required: true },
  },
});

export const CustomShoeDesign = model<TCustomShoeDesign>(
  'CustomShoeDesign',
  CustomShoeDesignSchema,
);
