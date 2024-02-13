import { Schema, model } from 'mongoose';
import {
  CustomShoeDesignModel,
  TCustomShoeDesign,
} from './customDesign.interface';

const CustomShoeDesignSchema = new Schema<
  TCustomShoeDesign,
  CustomShoeDesignModel
>({
  userId: { type: String },
  designName: { type: String },
  customization: {
    colors: { type: String },
    patterns: { type: String },
    material: { type: String, enum: ['Leather', 'fabric'] },
    customFeatures: { type: String },
  },
});

// checking if the custom design exists in the DB

CustomShoeDesignSchema.statics.isCustomShoeDesignExists = async function (
  shoeId: string,
) {
  return await CustomShoeDesign.findById(shoeId);
};

export const CustomShoeDesign = model<TCustomShoeDesign, CustomShoeDesignModel>(
  'CustomShoeDesign',
  CustomShoeDesignSchema,
);
