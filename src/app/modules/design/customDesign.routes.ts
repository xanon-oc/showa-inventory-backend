import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { CustomShoeDesignSchemaValidation } from './customDesign.validation';
import { CustomShoeDesignController } from './customDesign.controller';
import { USER_ROLE } from '../../types/index.type';

const router = Router();

router.post(
  '/addCustomShoeDesign',
  auth(USER_ROLE.user, USER_ROLE.seller),
  ValidateRequest(
    CustomShoeDesignSchemaValidation.AddCustomShoeDesignSchemaValidation,
  ),
  CustomShoeDesignController.addCustomShoeDesign,
);
router.put(
  '/updateCustomShoeDesign/:id',
  auth(USER_ROLE.user),
  ValidateRequest(
    CustomShoeDesignSchemaValidation.UpdateCustomShoeDesignSchemaValidation,
  ),
  CustomShoeDesignController.updateCustomShoeDesign,
);
router.get(
  '/getCustomShoeDesign',
  auth(USER_ROLE.user, USER_ROLE.seller),
  CustomShoeDesignController.getCustomShoeDesign,
);

export const CustomShoeDesignRouter = router;
