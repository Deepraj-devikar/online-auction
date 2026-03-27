import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get cart data
router.get('', userAuth, cartController.getCart);

//route to add book to cart
router.post('/add/book/:bookId', userAuth, cartController.addBook);

//route to remove book from cart
router.post('/remove/book/:bookId', userAuth, cartController.removeBook);

//route to remove all books from cart
router.post('/remove/all-books/:bookId', userAuth, cartController.removeAllBooks);

//route to purchase cart books
router.post('/purchase', userAuth, cartController.purchase);

export default router;