import { Schema, model, Document } from 'mongoose';

export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  FANTASY = 'FANTASY',
  BIOGRAPHY = 'BIOGRAPHY',
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: Object.values(Genre),
    },
    isbn: {
      type: String,
      required: [true, 'ISBN is required'],
      unique: true,
      trim: true,
    },
    description: { type: String, trim: true },
    copies: {
      type: Number,
      required: [true, 'Number of copies is required'],
      min: [0, 'Copies must be a positive number'],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) {
    return 'Book not found';
  }
  book.available = book.copies > 0;
  return book.save();
};

export const Book = model<IBook>('Book', bookSchema);
