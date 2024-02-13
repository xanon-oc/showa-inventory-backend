import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { SalesValidation } from './sales.validation';
import { SaleController } from './sales.controller';

const router = Router();

router.post(
  '/addSale',
  ValidateRequest(SalesValidation.SalesValidationSchema),
  SaleController.postSale,
);

export const SaleRoutes = router;
