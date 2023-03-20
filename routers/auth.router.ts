import express from 'express';

//----Controllers
import { signinUser, signupCenter, signupTrainee, signupTrainer } from "../controllers/UserController";

//----Validators
import { authValidator } from '../validators/auth.validator';
import { centerCreateValidator } from '../validators/center.validators';
import { traineeCreateValidator } from '../validators/trainee.validator';
import { trainerCreateValidator } from '../validators/trainer.validator';



const authRouter:express.Router = express.Router();


authRouter.post('/signin', authValidator, signinUser);

authRouter.post('/trainee/signup', traineeCreateValidator, signupTrainee);

authRouter.post('/trainer/signup', trainerCreateValidator, signupTrainer);

authRouter.post('/center/signup', centerCreateValidator, signupCenter);


export default authRouter;


