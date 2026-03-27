import HttpStatus from 'http-status-codes';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    // bearer token is hard coded
    if (bearerToken != process.env.AUTH_TOKEN)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is reuired'
      }
    next();
  } catch (error) {
    next(error);
  }
};