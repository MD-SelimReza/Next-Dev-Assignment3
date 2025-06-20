import express, { Application, Request, Response, NextFunction } from 'express';
import bookRoutes from './routes/book.routes';
import borrowRoutes from './routes/borrow.routes';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Library Management System API');
});

// Handle unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
    success: false,
  });
});

// Global error handler
app.use(errorHandler);

export default app;
