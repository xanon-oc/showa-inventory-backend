import { Router } from 'express';
import { HistoryController } from './history.controller';

const router = Router();

router.get('/salesHistory/:query', HistoryController.salesHistory);

export const HistoryRoutes = router;
