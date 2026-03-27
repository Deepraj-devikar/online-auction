import express from 'express';
import * as customerController from '../controllers/customer.controller';
import { customerValidator } from '../validators/customer.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get customer
router.get('', userAuth, customerController.getCustomer);

//route to create a new customer
router.post('/add/address', userAuth, customerValidator, customerController.addAddress);

export default router;