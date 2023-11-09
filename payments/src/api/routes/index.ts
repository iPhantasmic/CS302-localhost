import { Router } from 'express';
import AccountRouter from './Accounts';
import PaymentRouter from './Payments';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/accounts', AccountRouter);
router.use('/payments', PaymentRouter);

// Export the base-router
export default router;
