import express from 'express';
const router = express.Router();
import { createWithdrawal, getAuthorWithdrawals } from '../controller/withdrawals.controller.js';


router.post('/',createWithdrawal);
router.get('/author/:id', getAuthorWithdrawals);
export default router;
