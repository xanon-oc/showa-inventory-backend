import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { CustomShoeDesignSchemaValidation } from './customDesign.validation';
import { CustomShoeDesignController } from './customDesign.controller';

const router = Router();

router.post(
  '/addCustomShoeDesign',
  auth('admin', 'user'),
  ValidateRequest(
    CustomShoeDesignSchemaValidation.AddCustomShoeDesignSchemaValidation,
  ),
  CustomShoeDesignController.addCustomShoeDesign,
);
// router.patch(
//   '/updateShoePolishRequest/:id',
//   auth('admin', 'user'),
//   ValidateRequest(
//     ShoePolishRequestSchemaValidation.ShoePolishRequestUpdateSchema,
//   ),
//   ShoePolishRequestController.updateShoePolishRequest,
// );

export const CustomShoeDesignRouter = router;
