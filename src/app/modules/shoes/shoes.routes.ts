import { Router } from 'express';
import { ShoeControllers } from './shoes.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { ShoeValidation } from './shoes.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../types/index.type';

const router = Router();

// Add a new pair of shoes to the inventory.
router.post(
  '/addNewPair',
  auth(USER_ROLE.seller),
  ValidateRequest(ShoeValidation.ShoeValidationSchema),
  ShoeControllers.addAShoes,
);

// Delete existing shoes from the inventory.
router.delete(
  '/deleteShoe/:id',
  auth(USER_ROLE.seller),
  ShoeControllers.deleteShoes,
);
// bulk Delete existing shoes from the inventory.
router.delete(
  '/bulkDeleteShoe',
  auth(USER_ROLE.seller),
  ShoeControllers.bulkDeleteShoes,
);

// Update shoe details.
router.put(
  '/updateDetails/:id',
  auth(USER_ROLE.seller),
  ValidateRequest(ShoeValidation.ShoeUpdateValidationSchema),
  ShoeControllers.updateShoeDetails,
);

// Read and view the list of shoes in the inventory.
router.get('/getAllShoes', ShoeControllers.getAllShoes);

// product Verification Into DB
router.get('/productVerification/:id', ShoeControllers.productVerification);

export const ShoeRoutes = router;
