import { Model } from 'mongoose';

export type ShoePolishRequest = {
  userId: string; // Unique identifier for the user submitting the request
  requestDate: Date; // Date when the request was submitted
  preferences: {
    polishType: 'regular' | 'premium';
    shineLevel: 'low' | 'medium' | 'high';
    instructions?: string;
  };
  status: 'pending' | 'processing' | 'completed';
};

export interface ShoePolishModel extends Model<ShoePolishRequest> {
  isShoePolishExists(shoeId: string): Promise<ShoePolishRequest>;
}
