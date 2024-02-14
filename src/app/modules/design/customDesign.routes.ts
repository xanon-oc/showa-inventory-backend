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
router.put(
  '/updateCustomShoeDesign/:id',
  auth('admin', 'user'),
  ValidateRequest(
    CustomShoeDesignSchemaValidation.UpdateCustomShoeDesignSchemaValidation,
  ),
  CustomShoeDesignController.updateCustomShoeDesign,
);
router.get(
  '/getCustomShoeDesign',
  auth('admin', 'user'),
  CustomShoeDesignController.getCustomShoeDesign,
);

export const CustomShoeDesignRouter = router;
