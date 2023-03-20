//Fichier de configuration du router principal
import express from 'express';
const router:express.Router = express.Router();
import authRouter from './auth.router'; 
import userRouter from './user.router';


router.use('/api/auth', authRouter);

router.use('/api/user', userRouter);

export default router;


