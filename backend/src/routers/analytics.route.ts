import { Router } from 'express';
import { getKPIs, getCashflowChart, getAnalyticsBreakdown } from '../controllers/analytics.controller';

const router = Router();

router.get('/kpis', getKPIs);
router.get('/cashflow', getCashflowChart);
router.get('/breakdown', getAnalyticsBreakdown);

export default router;
