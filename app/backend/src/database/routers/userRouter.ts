import { Router } from 'express';
import User from '../models/userModel';
import UserService from '../services/userService';
import UserController from '../controllers/userController';
import loginValidation from '../middlewares/loginValidation';
import tokenVerification from '../middlewares/tokenVerification';

const route = Router();
const service = new UserService(User);
const controller = new UserController(service);

route.post('/', loginValidation, controller.loginVerification);
route.get('/role', tokenVerification.tokenVerify, controller.tokenRole);

export default route;
