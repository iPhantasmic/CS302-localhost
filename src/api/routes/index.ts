import { Router } from 'express';
import TransactionRouter from './Transactions';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/transactions', TransactionRouter);

// Export the base-router
export default router;
