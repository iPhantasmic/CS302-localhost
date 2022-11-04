import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { AppDataSource } from '../..';
import { Account } from '../models/Account';
import { stripe } from '../..';
import { Transaction } from '../models/Transaction';

const router = Router();

/******************************************************************************
 *          Create Payment from a user on Payments Service - "POST /api/payments/create"
 *          Request body includes
 *          {   
 *              "amount": 300,
 *              "bookingId": "8812717d-09d4-4e9d-b686-1f333a47e7bc" # UUID on Grpc end
 *              "userId": "8812717d-09d4-4e9d-b686-1f333a47e7bc"
 *          }
 ******************************************************************************/
router.post('/create', async (req: Request, res: Response) => {
    var paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'sgd',
        payment_method_types: ['card'],
    });

    paymentIntent = await stripe.paymentIntents.confirm(
        paymentIntent.id,
        {payment_method: 'pm_card_visa'}
    );

    const account = await AppDataSource.createQueryBuilder()
    .select('account')
    .from(Account, 'account')
    .where('account.id = :id', { id: req.body.userId })
    .getOne();

    const transaction = new Transaction()
    transaction.id = paymentIntent.id
    transaction.bookingid = req.body.bookingId
    transaction.chargeid = paymentIntent.charges.data[0].id
    transaction.account = account
    const transactionRepository = await AppDataSource.getRepository(Transaction)
    await transactionRepository.save(transaction)
    return res.status(OK).json(transaction);
}); 

/******************************************************************************
 *          Refund Payment from a user on Payments Service - "POST /api/payments/refund"
 *          Request body includes
 *          {   
 *              "bookingId": "8812717d-09d4-4e9d-b686-1f333a47e7bc" # UUID on Grpc end
 *          }
 ******************************************************************************/
 router.post('/refund', async (req: Request, res: Response) => {
    const transaction = await AppDataSource.createQueryBuilder()
    .select('transaction')
    .from(Transaction, 'transaction')
    .where('transaction.bookingid = :id', { id: req.body.bookingId })
    .getOne();
    const refund = await stripe.refunds.create({
        charge: transaction.chargeid,
      });

    return res.status(OK).json({refund});
}); 


/******************************************************************************
 *                      Get Payment by ID - "GET /api/payments/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params as ParamsDictionary;
  const transaction = await AppDataSource.createQueryBuilder()
    .select('transaction')
    .from(Transaction, 'transaction')
    .where('transaction.id = :id', { id: id })
    .getOne();
  if (!transaction) {
    res.status(404);
    res.end();
    return;
  }
  return res.status(OK).json({ transaction });
});

/******************************************************************************
 *                      Get all payments - "GET /api/payments/"
 ******************************************************************************/

 router.get('/', async (req: Request, res: Response) => {
  const transactions = await AppDataSource.createQueryBuilder()
    .select('transaction')
    .from(Transaction, 'transaction')
    .getMany();
  if (!transactions) {
    res.status(404);
    res.end();
    return;
  }
  return res.status(OK).json({ transactions });
});
/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
