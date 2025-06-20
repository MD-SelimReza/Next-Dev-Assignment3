import { Request, Response } from 'express';
import { Book } from '../models/book.model';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = 'createdAt',
      sort = 'desc',
      limit = 5,
    } = req.query;

    const query: any = {};
    if (filter) query.genre = filter;

    const books = await Book.find(query)
      .sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 })
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'MongoDB query failed',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'MongoDB query failed',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};

export const updateBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Validation failed',
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
};

export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: book ? book : null,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'MongoDB query failed',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    });
  }
};
