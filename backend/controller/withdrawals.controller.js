import { authors, withdrawals } from '../data/seed.js';
import { calculateCurrentBalance } from '../utils/earnings.js';


export const createWithdrawal =  (req, res) => {
    const { author_id, amount } = req.body;

    // Validation
    if (!author_id || amount === undefined) {
        return res.status(400).json({ error: "author_id and amount are required" });
    }

    const author = authors.find(a => a.id === parseInt(author_id));
    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }

    if (amount < 500) {
        return res.status(400).json({ error: "Minimum withdrawal amount is ₹500" });
    }

    const currentBalance = calculateCurrentBalance(author.id);
    if (amount > currentBalance) {
        return res.status(400).json({ error: "Insufficient balance" });
    }

    // Create withdrawal record
    const newWithdrawal = {
        id: withdrawals.length + 1,
        author_id: author.id,
        amount: amount,
        status: "pending",
        created_at: new Date().toISOString()
    };

    withdrawals.push(newWithdrawal);

    res.status(201).json({
        message: "Withdrawal request created successfully",
        withdrawal: newWithdrawal,
        new_balance: calculateCurrentBalance(author.id)
    });
}

export const getAuthorWithdrawals = (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);

    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }

    const authorWithdrawals = withdrawals
        .filter(w => w.author_id === authorId)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json(authorWithdrawals);
}