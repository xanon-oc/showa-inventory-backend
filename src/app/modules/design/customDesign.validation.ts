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
const UpdateCustomShoeDesignSchemaValidation = z.object({
  body: z.object({
    designName: z.string().optional(),
    customization: z
      .object({
        colors: z.string().optional(),
        patterns: z.string().optional(),
        material: z.enum(['Leather', 'fabric']).optional(),
        customFeatures: z.string().optional(),
      })
      .optional(),
  }),
});

export const CustomShoeDesignSchemaValidation = {
  AddCustomShoeDesignSchemaValidation,
  UpdateCustomShoeDesignSchemaValidation,
};
