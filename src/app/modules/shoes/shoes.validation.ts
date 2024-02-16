import { z } from 'zod';
import { ShoeColor, ShoeSize, ShoeStyle } from './shoes.constant';

const ShoeValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    releaseDate: z.string(),
    brand: z.string(),
    model: z.string(),
    style: z.enum(ShoeStyle),
    size: z.enum(ShoeSize),
    color: z.enum(ShoeColor),
    material: z.enum(['leather', 'fabric']),
    imageUrl: z.string(),
  }),
});
const ShoeUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    quantity: z.number().optional(),
    releaseDate: z.string().optional(),
    brand: z.string().optional(),
    model: z.string().optional(),
    style: z.enum(ShoeStyle).optional(),
    size: z.enum(ShoeSize).optional(),
    color: z.enum(ShoeColor).optional(),
    material: z.enum(['leather', 'fabric']).optional(),
    imageUrl: z.string().optional(),
  }),
});

export const ShoeValidation = {
  ShoeValidationSchema,
  ShoeUpdateValidationSchema,
};
