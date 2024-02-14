import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { ShoePolishRequestSchemaValidation } from './shoePolishing.validation';
import { ShoePolishRequestController } from './shoePolishing.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../types/index.type';

const router = Router();

router.post(
  '/addShoePolishRequest',
  auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.seller),
  ValidateRequest(ShoePolishRequestSchemaValidation.ShoePolishRequestAddSchema),
  ShoePolishRequestController.addShoePolishRequest,
);
router.patch(
  '/updateShoePolishRequest/:id',
  auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.seller),
  ValidateRequest(
    ShoePolishRequestSchemaValidation.ShoePolishRequestUpdateSchema,
  ),
  ShoePolishRequestController.updateShoePolishRequest,
);
router.get(
  '/getAllShoePolishRequest',
  auth(USER_ROLE.user, USER_ROLE.superAdmin, USER_ROLE.seller),
  ShoePolishRequestController.getPolishStatusWithData,
);

export const ShoePolish = router;
