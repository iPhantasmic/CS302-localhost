import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { AppDataSource } from '../..';
import { Account } from '../models/Account';
import { stripe } from '../..';

const router = Router();

/******************************************************************************
 *          Create Payment from a user on Payments Service - "POST /payments"
 *          Request body includes
 *          {   
 *              "amount": 300,
 *              "user_id": "8812717d-09d4-4e9d-b686-1f333a47e7bc" # UUID on Grpc end
 *          }
 ******************************************************************************/
router.post('/', async (req: Request, res: Response) => {
    const account = await stripe.accounts.create({
        type: 'express',
        country: 'SG',
        email: req.body.email,
        capabilities: {
          card_payments: {requested: true},
          transfers: {requested: true},
        },
        business_type: 'individual',
        business_profile: {
          url: "https://cs302-ui.vercel.app/",
        }
      })
    const new_account = new Account()
    new_account.id = account.id
    new_account.email = account.email
    new_account.userid = req.body.userId
    const accountRepository = await AppDataSource.getRepository(Account)
    await accountRepository.save(new_account)
    return res.status(OK).json(new_account);
}); 

/******************************************************************************
 *          Delete Account for a user by user_id- "DELETE /account"
 *          Request body includes
 *          {
 *              "userId": "8812717d-09d4-4e9d-b686-1f333a47e7bc" # UUID on Grpc end
 *          }
 ******************************************************************************/
 router.delete('/', async (req: Request, res: Response) => {
  const accountRepository = AppDataSource.getRepository(Account)
  const toDelete = await accountRepository.findOneBy({
    userid: req.body.userId
  })
  await stripe.accounts.del(
    toDelete.id
  );
  await accountRepository.remove(toDelete)
  return res.status(OK).json(toDelete);
}); 

/******************************************************************************
 *                      Get Account by ID - "GET /transactions/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params as ParamsDictionary;
  const account = await AppDataSource.createQueryBuilder()
    .select('account')
    .from(Account, 'account')
    .where('title.id = :id', { id: id })
    .getOne();
  if (!account) {
    res.status(404);
    res.end();
    return;
  }
  return res.status(OK).json({ account });
});

/******************************************************************************
 *                      Get all payments - "GET /payments/"
 ******************************************************************************/

 router.get('/', async (req: Request, res: Response) => {
  const accounts = await AppDataSource.createQueryBuilder()
    .select('account')
    .from(Account, 'account')
    .getMany();
  if (!accounts) {
    res.status(404);
    res.end();
    return;
  }
  return res.status(OK).json({ accounts });
});
/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
