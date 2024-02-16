import { Router } from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { ShoePolishRequestSchemaValidation } from './shoePolishing.validation';
import { ShoePolishRequestController } from './shoePolishing.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../types/index.type';

const router = Router();

router.post(
  '/addShoePolishRequest',
  auth(USER_ROLE.user, USER_ROLE.seller),
  ValidateRequest(ShoePolishRequestSchemaValidation.ShoePolishRequestAddSchema),
  ShoePolishRequestController.addShoePolishRequest,
);
router.put(
  '/updateShoePolishRequest/:id',
  // auth(USER_ROLE.user, USER_ROLE.seller),
  // ValidateRequest(
  //   ShoePolishRequestSchemaValidation.ShoePolishRequestUpdateSchema,
  // ),
  ShoePolishRequestController.updateShoePolishRequest,
);
router.get(
  '/getAllShoePolishRequest/:email',
  auth(USER_ROLE.user, USER_ROLE.seller),
  ShoePolishRequestController.getPolishStatusWithData,
);
router.get(
  '/getAllShoePolishRequest',
  auth(USER_ROLE.user, USER_ROLE.seller),
  ShoePolishRequestController.getPolishData,
);

export const ShoePolish = router;
