import express from 'express';
import * as borrowController from '../controllers/borrow.controller';
const router = express.Router();

router.post('/', borrowController.borrowBook);
router.get('/', borrowController.getBorrowSummary);

export default router;
