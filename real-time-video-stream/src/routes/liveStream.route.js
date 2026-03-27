import express from 'express';
import { currentTime, setRTMPServer } from '../controllers/liveStream.controller';
import { liveStreamValidator } from '../validators/liveStream.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new liveStream
router.post('', userAuth, liveStreamValidator, setRTMPServer);

//route to show current time
router.get('/current-time', currentTime);

export default router;