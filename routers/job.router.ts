import express from 'express';
import { createJob, deleteJobs, getJobs, getJobsByCenter } from '../controllers/JobController';
import { isLoggedInAsCenterMiddleware } from '../middlewares/isLoggedInAsCenter';
import { jobValidator } from '../validators/job.validator';

const jobRouter:express.Router = express.Router();

jobRouter.post('/create', jobValidator,  isLoggedInAsCenterMiddleware, createJob);
jobRouter.get('/center/jobs', isLoggedInAsCenterMiddleware, getJobsByCenter);
jobRouter.delete('/delete/:jobId',isLoggedInAsCenterMiddleware,  deleteJobs);
jobRouter.get('/', getJobs);

export default jobRouter;