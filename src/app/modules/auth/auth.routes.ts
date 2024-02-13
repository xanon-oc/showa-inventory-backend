import { Router } from 'express';
import { AuthControllers } from './auth.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';

const router = Router();

// create a user
router.post(
  '/register',
  ValidateRequest(AuthValidation.AuthRegisterSchemaValidation),
  AuthControllers.createAUser,
);
// login a user
router.post(
  '/login',
  ValidateRequest(AuthValidation.AuthLoginSchemaValidation),
  AuthControllers.loginAUser,
);

router.post(
  '/refresh-token',
  ValidateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
