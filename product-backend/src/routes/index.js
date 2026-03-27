import express from 'express';
const router = express.Router();

import customerRoute from './customer.route';
import wishlistRoute from './wishlist.route';
import cartRoute from './cart.route';
import bookRoute from './book.route';
import userRoute from './user.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);

  router.use('/books', bookRoute);
  router.use('/carts', cartRoute);
  router.use('/wishlists', wishlistRoute);
  router.use('/customers', customerRoute);
  return router;
};

export default routes;