import { Router } from 'express';
import TransactionRouter from './Transactions';
import AccountRouter from './Accounts';
import PaymentRouter from './Payments';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/transactions', TransactionRouter);
router.use('/accounts', AccountRouter);
router.use('/payments', PaymentRouter);

// Export the base-router
export default router;
