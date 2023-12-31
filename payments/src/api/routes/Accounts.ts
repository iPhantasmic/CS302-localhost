import { Request, Response, Router } from 'express';
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { AppDataSource } from '../..';
import { Account } from '../models/Account';
import { stripe } from '../..';

const router = Router();

/******************************************************************************
 *          Create Account for a user on Payments Service - "POST /api/accounts/"
 *          Request body includes
 *          {
 *              "email": "jenny.rosen@gmail.com",
 *              "user_id": "8812717d-09d4-4e9d-b686-1f333a47e7bc" # UUID on Grpc end
 *          }
 ******************************************************************************/
router.post('/', async (req: Request, res: Response) => {
    const account = await stripe.accounts.create({
        type: 'express',
        country: 'SG',
        email: req.body.email,
        capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
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
    try {
        const connected_account = await AppDataSource.createQueryBuilder()
            .select('account')
            .from(Account, 'account')
            .where('account.userid = :userid', { userid: req.body.userId })
            .getOne();
        if (connected_account) { return res.status(OK)}
        const accountRepository = await AppDataSource.getRepository(Account)
        await accountRepository.save(new_account)
        return res.status(OK).json(new_account);
    } catch (e) {
        return res.status(INTERNAL_SERVER_ERROR).send(e)
    }
});

/******************************************************************************
 *          Delete Account for a user by user_id- "DELETE /api/accounts/"
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
    try {
        await accountRepository.remove(toDelete)
        return res.status(OK).json(toDelete);
    } catch (e) {
        return res.status(INTERNAL_SERVER_ERROR).send(e)
    }
});

/******************************************************************************
 *                      Get Account by ID - "GET /api/accounts/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params as ParamsDictionary;
    const account = await AppDataSource.createQueryBuilder()
        .select('account')
        .from(Account, 'account')
        .where('account.id = :id', { id: id })
        .getOne();
    if (!account) {
        res.status(404);
        res.end();
        return;
    }
    return res.status(OK).json({ account });
});

/******************************************************************************
 *                      Get all accounts - "GET /api/accounts/"
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
