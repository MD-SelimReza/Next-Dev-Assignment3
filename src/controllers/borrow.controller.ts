import { Request, Response } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book) throw new Error('Book not found');
    if (book.copies < quantity) throw new Error('Not enough copies available');
    const borrow = await Borrow.create({
      book: book._id,
      quantity,
      dueDate,
    });

    const responseData = {
      _id: borrow._id,
      book: borrow.book,
      quantity: borrow.quantity,
      dueDate: borrow.dueDate,
      createdAt: borrow.createdAt,
      updatedAt: borrow.updatedAt,
    };

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: responseData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Borrow failed. Not enough copies available',
      error,
    });
  }
};

export const getBorrowSummary = async (_req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookInfo',
      },
    },
    { $unwind: '$bookInfo' },
    {
      $project: {
        _id: 0,
        totalQuantity: 1,
        book: {
          title: '$bookInfo.title',
          isbn: '$bookInfo.isbn',
        },
      },
    },
  ]);
  res.json({
    success: true,
    message: 'Borrowed books summary retrieved successfully',
    data: summary,
  });
};
