/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TCustomShoeDesign = {
  userId: string;
  designName: string;
  customization: {
    colors: 'Red' | 'Blue' | 'Green';
    patterns: string;
    material: 'Leather' | 'fabric';
    customFeatures: string;
  };
};
export interface CustomShoeDesignModel extends Model<TCustomShoeDesign> {
  isCustomShoeDesignExists(shoeId: string): Promise<TCustomShoeDesign>;
}
