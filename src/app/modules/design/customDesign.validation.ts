import { z } from 'zod';

const AddCustomShoeDesignSchemaValidation = z.object({
  body: z.object({
    userId: z.string(),
    designName: z.string(),
    customization: z.object({
      colors: z.string(),
      patterns: z.string(),
      material: z.enum(['Leather', 'fabric']),
      customFeatures: z.string(),
    }),
  }),
});
const UpdateCustomShoeDesignSchemaValidation =
  AddCustomShoeDesignSchemaValidation.partial();

export const CustomShoeDesignSchemaValidation = {
  AddCustomShoeDesignSchemaValidation,
  UpdateCustomShoeDesignSchemaValidation,
};
