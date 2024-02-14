import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { ShoePolishRequestSchemaValidation } from './shoePolishing.validation';
import { ShoePolishRequestController } from './shoePolishing.controller';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/addShoePolishRequest',
  auth('admin', 'user'),
  ValidateRequest(ShoePolishRequestSchemaValidation.ShoePolishRequestAddSchema),
  ShoePolishRequestController.addShoePolishRequest,
);
router.patch(
  '/updateShoePolishRequest/:id',
  auth('admin', 'user'),
  ValidateRequest(
    ShoePolishRequestSchemaValidation.ShoePolishRequestUpdateSchema,
  ),
  ShoePolishRequestController.updateShoePolishRequest,
);
router.get(
  '/getAllShoePolishRequest',
  auth('admin', 'user'),
  ShoePolishRequestController.getPolishStatusWithData,
);

export const ShoePolish = router;
