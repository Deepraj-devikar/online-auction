import express from 'express';
const router = express.Router();

import liveStreamRoute from './liveStream.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });

  router.use('/live-stream', liveStreamRoute);
  return router;
};

export default routes;