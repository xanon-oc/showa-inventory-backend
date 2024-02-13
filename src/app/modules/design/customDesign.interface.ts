import { TShoeColor } from '../shoes/shoes.interface';

export type TCustomShoeDesign = {
  userId: string;
  designName: string;
  customization: {
    colors: TShoeColor;
    patterns: string;
    material: 'Leather' | 'fabric';
    customFeatures: string;
  };
};
