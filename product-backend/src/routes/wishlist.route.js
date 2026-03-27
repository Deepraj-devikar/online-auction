import express from 'express';
import * as wishlistController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get wishlist data
router.get('', userAuth, wishlistController.getWishlist);

//route to add book to wishlist
router.post('/add/book/:bookId', userAuth, wishlistController.addBook);

//route to remove book from wishlist
router.post('/remove/book/:bookId', userAuth, wishlistController.removeBook);

export default router;