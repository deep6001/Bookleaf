import express from 'express';
const router = express.Router();
import { authors, withdrawals } from '../data/seed.js';
import { calculateCurrentBalance } from '../utils/earnings.js';
import { createWithdrawal, getAuthorWithdrawals } from '../controller/withdrawals.controller.js';

/**
 * POST /withdrawals
 * Create a new withdrawal request
 */
router.post('/',createWithdrawal);

/**
 * GET /authors/:id/withdrawals
 * Return all withdrawals for a specific author sorted newest first
 */
router.get('/author/:id', getAuthorWithdrawals);
export default router;
