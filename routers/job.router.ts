import express from 'express';
import { createJob } from '../controllers/JobController';
import { isLoggedInAsCenterMiddleware } from '../middlewares/isLoggedInAsCenter';
import { jobValidator } from '../validators/job.validator';

const jobRouter:express.Router = express.Router();

jobRouter.post('/create', jobValidator,  isLoggedInAsCenterMiddleware, createJob);

export default jobRouter;