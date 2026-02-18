import {books,sales,authors} from '../data/seed.js'
import { calculateCurrentBalance, calculateTotalEarnings, getBookStats } from '../utils/earnings.js';


export const getAllAuthors = (req, res) => {
    const authorList = authors.map(author => ({
        id: author.id,
        name: author.name,
        total_earnings: calculateTotalEarnings(author.id),
        current_balance: calculateCurrentBalance(author.id)
    }));
    res.json(authorList);
}

export const getAuthorById = (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);

    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }

    const authorBooks = books.filter(b => b.author_id === authorId);
    const totalBooks = authorBooks.length;
    const totalEarnings = calculateTotalEarnings(authorId);
    const currentBalance = calculateCurrentBalance(authorId);

    const booksWithStats = authorBooks.map(book => getBookStats(book.id));

    res.json({
        id: author.id,
        name: author.name,
        email: author.email,
        total_books: totalBooks,
        total_earnings: totalEarnings,
        current_balance: currentBalance,
        books: booksWithStats
    });
}

export const getAuthorSales = (req, res) => {
    const authorId = parseInt(req.params.id);
    const author = authors.find(a => a.id === authorId);

    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }

    const authorBookIds = books
        .filter(b => b.author_id === authorId)
        .map(b => b.id);

    const authorSales = sales
        .filter(sale => authorBookIds.includes(sale.book_id))
        .map(sale => {
            const book = books.find(b => b.id === sale.book_id);
            return {
                book_title: book.title,
                quantity: sale.quantity,
                royalty_earned: sale.quantity * book.royalty_per_sale,
                sale_date: sale.date
            };
        })
        .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date));

    res.json(authorSales);
}

export const getAllWithdrawals = (req, res) => {

    if(!req.params.id){
        return res.status(400).json({ error: "Author ID is required" });
    } 
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