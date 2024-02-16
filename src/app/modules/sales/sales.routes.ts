import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { SalesValidation } from './sales.validation';
import { SaleController } from './sales.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../types/index.type';

const router = Router();

router.post(
  '/addSale',
  auth(USER_ROLE.seller),
  ValidateRequest(SalesValidation.SalesValidationSchema),
  SaleController.postSale,
);

export const SaleRoutes = router;
