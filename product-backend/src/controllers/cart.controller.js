import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

/**
 * Controller to get cart data
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getCart = async (req, res, next) => {
  try {
    const cart = await CartService.getCart(req.body.userID);
    if(cart) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: cart,
        message: 'Cart fetched successfully'
      });
    }else{
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: {books: []},
        message: 'Cart not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Controller to add book to cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addBook = async (req, res, next) => {
  try {
    const data = await CartService.addBook(req.body.userID, req.params.bookId);
    if(data.message == 'Book not found.' || data.message == 'Book out of stock.'){
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: data,
        message: 'Book Not Found'
      });
    } else {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Cart created successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to remove book from cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const removeBook = async (req, res, next) => {
  try {
    const data = await CartService.removeBook(req.body.userID, req.params.bookId);
    if(data.message == 'Book not found.'){
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: data,
        message: 'Book Not Found'
      });
    } else {
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Book removed successfully'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const removeAllBooks = async (req, res, next) => {
  try {
    const data = await CartService.removeBook(req.body.userID, req.params.bookId, 'ALL' == 'ALL');
    if(data.message == 'Book not found.'){
      res.status(HttpStatus.NOT_FOUND).json({
        code: HttpStatus.NOT_FOUND,
        data: data,
        message: 'Book Not Found'
      });
    } else {
      res.status(HttpStatus.ACCEPTED).json({
        code: HttpStatus.ACCEPTED,
        data: data,
        message: 'Book removed successfully'
      });
    }
  } catch (error) {
    next(error);
  }
}

export const purchase = async (req, res, next) => {
  try {
    const data = await CartService.purchase(req.body.userID);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Book purchased successfully'
    });
  } catch (error) {
    next(error);
  }
}