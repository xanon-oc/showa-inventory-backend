import { Model } from 'mongoose';

export type TShoeStyle =
  | 'Running Shoes'
  | 'Casual Shoes'
  | 'Athletic Shoes'
  | 'Sneakers'
  | 'Boots'
  | 'Sandals'
  | 'Loafers'
  | 'Slippers'
  | 'Hiking Boots';

export type TShoeSize = '7' | '8' | '9' | '10';
export type TShoeColor = 'Red' | 'Blue' | 'Green';

export type TShoe = {
  shoeId: string;
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  style: TShoeStyle;
  size: TShoeSize;
  color: TShoeColor;
  material: 'leather' | 'fabric';
};

export interface ShoeModel extends Model<TShoe> {
  isShoeExists(shoeId: string): Promise<TShoe>;
}
