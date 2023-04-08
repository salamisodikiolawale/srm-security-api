//Fichier de configuration du router principal
import express from 'express';
const router:express.Router = express.Router();
import authRouter from './auth.router'; 
import jobRouter from './job.router';
import userRouter from './user.router';

router.use('/api/auth', authRouter);

router.use('/api/user', userRouter);

router.use('/api/jobs', jobRouter);

export default router;


