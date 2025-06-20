import { Schema, model, Document, Types } from 'mongoose';

export interface IBorrow extends Document {
  bookId: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export const borrowSchema = new Schema<IBorrow>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: [true, 'Book ID is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    dueDate: {
      type: Date,
      required: [true, 'Due date is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

borrowSchema.post('save', async function (this: IBorrow) {
  const Book = model('Book');
  const book = await Book.findById(this.bookId);
  if (book) {
    book.copies -= this.quantity;
    book.available = book.copies > 0;
    await book.save();
  }
});

export const Borrow = model<IBorrow>('Borrow', borrowSchema);
