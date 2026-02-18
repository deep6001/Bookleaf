import express, { json } from 'express';
import cors from 'cors';
import authorsRoutes from './routes/authors.js';
import withdrawalRoutes from './routes/withdrawals.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/authors', authorsRoutes);
app.use('/withdrawals', withdrawalRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: "Author Royalty and Withdrawal System API",
        status: "online"
    });
});

// Error handling for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
