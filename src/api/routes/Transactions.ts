import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import { AppDataSource } from '../..';
import { Transaction } from '../models/Transaction';

const router = Router();

/******************************************************************************
 *                      Get Transaction by ID - "GET /transactions/:id"
 ******************************************************************************/

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params as ParamsDictionary;
  const transaction = await AppDataSource.createQueryBuilder()
    .select('transaction')
    .from(Transaction, 'title')
    .where('title.id = :id', { id: id })
    .getOne();
  if (!transaction) {
    res.status(404);
    res.end();
    return;
  }
  return res.status(OK).json({ transaction });
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
