import express from 'express';
import * as bookController from '../controllers/book.controller';
const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);
router.get('/:bookId', bookController.getBookById);
router.put('/:bookId', bookController.updateBookById);
router.delete('/:bookId', bookController.deleteBookById);

export default router;
