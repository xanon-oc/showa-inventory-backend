import { z } from 'zod';

const SalesValidationSchema = z.object({
  body: z.object({
    productId: z.string(),
    quantity: z.number(),
    buyerName: z.string(),
    saleDate: z.string(),
  }),
});

export const SalesValidation = {
  SalesValidationSchema,
};
