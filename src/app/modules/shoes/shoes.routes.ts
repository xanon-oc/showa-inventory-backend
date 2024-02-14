import { Router } from 'express';
import { ShoeControllers } from './shoes.controller';
import ValidateRequest from '../../middlewares/validateRequest';
import { ShoeValidation } from './shoes.validation';
import auth from '../../middlewares/auth';

const router = Router();

// Add a new pair of shoes to the inventory.
router.post(
  '/addNewPair',
  auth('admin'),
  ValidateRequest(ShoeValidation.ShoeValidationSchema),
  ShoeControllers.addAShoes,
);

// Delete existing shoes from the inventory.
router.delete('/deleteShoe/:id', ShoeControllers.deleteShoes);
// bulk Delete existing shoes from the inventory.
router.delete('/bulkDeleteShoe', ShoeControllers.bulkDeleteShoes);

// Update shoe details.
router.put(
  '/updateDetails/:id',
  auth('admin'),
  ValidateRequest(ShoeValidation.ShoeUpdateValidationSchema),
  ShoeControllers.updateShoeDetails,
);

// Read and view the list of shoes in the inventory.
router.get('/getAllShoes', auth('admin'), ShoeControllers.getAllShoes);

// product Verification Into DB
router.get(
  '/productVerification/:id',
  auth('admin', 'user'),
  ShoeControllers.productVerification,
);

export const ShoeRoutes = router;
