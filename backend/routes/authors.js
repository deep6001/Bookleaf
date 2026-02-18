import express from 'express';
const router = express.Router();
import {books,sales,authors} from '../data/seed.js'
import {
    calculateTotalEarnings,
    calculateCurrentBalance,
    getBookStats
} from '../utils/earnings.js';
import { getAllAuthors, getAuthorById, getAuthorSales } from '../controller/author.controller.js';

/**
 * GET /authors
 * Return all authors: id, name, total_earnings, current_balance
 */
router.get('/',getAllAuthors);

/**
 * GET /authors/:id
 * Return detailed author info
 */
router.get('/:id', getAuthorById);

/**
 * GET /authors/:id/sales
 * Return all sales of author books sorted newest first
 */
router.get('/:id/sales', getAuthorSales);

export default router;
