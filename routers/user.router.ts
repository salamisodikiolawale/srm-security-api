import express from 'express';
import { getCurrentUser} from "../controllers/UserController";
import { isLoggedInMiddleware } from '../middlewares/isLoggedIn';
import { authValidator } from '../validators/auth.validator';

const userRouter:express.Router = express.Router();


userRouter.get('/current', authValidator, isLoggedInMiddleware, getCurrentUser);



export default userRouter;


