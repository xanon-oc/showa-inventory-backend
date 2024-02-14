import { Router } from 'express';
import { HistoryController } from './history.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../types/index.type';

const router = Router();

router.get(
  '/salesHistory/:query',
  auth(USER_ROLE.superAdmin, USER_ROLE.seller),
  HistoryController.salesHistory,
);

export const HistoryRoutes = router;
