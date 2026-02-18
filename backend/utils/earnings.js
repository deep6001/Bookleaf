import { books, sales, withdrawals } from "../data/seed.js";

/**
 * Total earnings from all book sales of an author
 */
export const calculateTotalEarnings = (authorId) => {
  const authorBooks = books.filter(b => b.author_id === authorId);
  const bookMap = new Map(authorBooks.map(b => [b.id, b]));

  return sales
    .filter(s => bookMap.has(s.book_id))
    .reduce((sum, s) => {
      const book = bookMap.get(s.book_id);
      return sum + s.quantity * book.royalty_per_sale;
    }, 0);
};

/**
 * Total withdrawals of an author
 */
export const calculateTotalWithdrawals = (authorId) => {
  return withdrawals
    .filter(w => w.author_id === authorId)
    .reduce((sum, w) => sum + w.amount, 0);
};

/**
 * Current balance = earnings − withdrawals
 */
export const calculateCurrentBalance = (authorId) => {
  return calculateTotalEarnings(authorId) - calculateTotalWithdrawals(authorId);
};

/**
 * Book statistics
 */
export const getBookStats = (bookId) => {
  const book = books.find(b => b.id === bookId);
  if (!book) return null;

  const totalSold = sales
    .filter(s => s.book_id === bookId)
    .reduce((sum, s) => sum + s.quantity, 0);

  return {
    ...book,
    total_sold: totalSold,
    total_royalty: totalSold * book.royalty_per_sale
  };
};
