import { z } from 'zod';

const ShoePolishRequestAddSchema = z.object({
  body: z.object({
    userId: z.string(),
    requestDate: z.date().optional(),
    preferences: z.object({
      polishType: z.enum(['regular', 'premium']),
      shineLevel: z.enum(['low', 'medium', 'high']),
      instructions: z.string().optional(),
    }),
    status: z.enum(['pending', 'processing', 'completed']).optional(),
  }),
});
const ShoePolishRequestUpdateSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'processing', 'completed']),
  }),
});

export const ShoePolishRequestSchemaValidation = {
  ShoePolishRequestAddSchema,
  ShoePolishRequestUpdateSchema,
};
