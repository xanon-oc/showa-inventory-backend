import { z } from 'zod';

const AuthLoginSchemaValidation = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});
const AuthRegisterSchemaValidation = z.object({
  body: z.object({
    name: z.string(),
    gender: z.enum(['male', 'female']),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['superAdmin', 'seller', 'user']),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

export const AuthValidation = {
  AuthLoginSchemaValidation,
  AuthRegisterSchemaValidation,
  refreshTokenValidationSchema,
};
