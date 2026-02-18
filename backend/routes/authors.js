import express from 'express';
const router = express.Router();
import { getAllAuthors, getAllWithdrawals, getAuthorById, getAuthorSales } from '../controller/author.controller.js';


router.get('/',getAllAuthors);
router.get('/:id', getAuthorById);
router.get('/:id/sales', getAuthorSales);
router.get('/:id/withdrawals', getAllWithdrawals);
export default router;
