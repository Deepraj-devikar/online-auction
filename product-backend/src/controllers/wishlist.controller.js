import HttpStatus from 'http-status-codes';
import * as WishlistService from '../services/wishlist.service';

/**
 * Controller to get wishlist data
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await WishlistService.getWishlist(req.body.userID);
    if(wishlist) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: wishlist,
        message: 'Wishlist fetched successfully'
      });
    }else{
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        message: 'Wishlist not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to add book to wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addBook = async (req, res, next) => {
  try {
    const data = await WishlistService.addBook(req.body.userID, req.params.bookId);
    if(data){
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Wishlist created successfully'
      });
    } else {
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: data,
        message: 'Book Not Found'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to add book to wishlist
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeBook = async (req, res, next) => {
  try {
    const data = await WishlistService.removeBook(req.body.userID, req.params.bookId);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Book removed from wishlist successfully'
    });
  } catch (error) {
    next(error);
  }
};