import HttpStatus from 'http-status-codes';
import * as BookService from '../services/book.service';

/**
 * Controller to get all books available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllBooks = async (req, res, next) => {
  try {
    const data = await BookService.getAllBooks(req.query);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All books fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single book
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getBook = async (req, res, next) => {
  try {
    const data = await BookService.getBook(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Book fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to add review to book
 * @param {object} req - request object
 * @param {object} res - response obejct
 * @param {Function} next 
 */
export const addReview = async (req, res, next) => {
  try {
    const data = await BookService.addReview(req.body, req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      message: data.message
    });
  } catch (error) {
    next(error);
  }
}