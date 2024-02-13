import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { ShoeRoutes } from '../modules/shoes/shoes.routes';
import { SaleRoutes } from '../modules/sales/sales.routes';
import { HistoryRoutes } from '../modules/history/history.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/shoes',
    route: ShoeRoutes,
  },
  {
    path: '/sales',
    route: SaleRoutes,
  },
  {
    path: '/history',
    route: HistoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
