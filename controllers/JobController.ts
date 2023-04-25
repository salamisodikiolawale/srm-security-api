import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { JobDTO } from "../dto/Job.dto";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import Logger from "../loggers/Logger";
import jobService from "../services/job.service";
import { RequestCustom } from "../models/RequestCustom";
import { User } from "../models/User.model";
import { Job } from "../models/Job.model";

export const createJob = async (request:Request & RequestCustom, response:Response, next:NextFunction) => {

    const errors = validationResult(request);
    if(!errors) {
        
        return response.status(HttpStatusCode.NOT_FOUND).json(errors);
    }

    const jobDto:JobDTO = request.body;
    try {
        await jobService.createJob(jobDto);
        return response.status(HttpStatusCode.CREATED).json('job created successfully');

    } catch (error) {
        
        Logger.error(error);
        
        return response.status(HttpStatusCode.INTERNAL_SERVER).json(error);
    }
}

export const getJobsByCenter = async (request:Request & RequestCustom, response:Response, next:NextFunction) => {

    if(!request.user) {

        return response.status(HttpStatusCode.UNAUTHORISED).json(`Vous n'ête pas autorisé`);
    }

    const user:User = request.user;

    try {

        const jobs =  await jobService.getJobsByCenter(user._id);

        return response.status(HttpStatusCode.OK).json(jobs);
    } catch (error) {
        
        return response.status(HttpStatusCode.NOT_FOUND).json(`Impossible de recuperer les jobs`);
    }    
}

export const getJobs = async (request:Request, response:Response, next:NextFunction) => {

    try {

        const jobs =  await jobService.getJobs();

        return response.status(HttpStatusCode.OK).json(jobs);
    } catch (error) {
        
        return response.status(HttpStatusCode.NOT_FOUND).json(`Impossible de recuperer les jobs`);
    }    
}

export const deleteJobs = async (request:Request & RequestCustom, response:Response, next:NextFunction) => {

    console.log("HELLO")
    let {jobId} = request.params;

    if(!request.user) {

        return response.status(HttpStatusCode.UNAUTHORISED).json(`Vous n'ête pas autorisé`);
    }

    const user:User = request.user;
    
    try {

        await jobService.deleteJobByCenter(jobId, user._id);

        return response.status(HttpStatusCode.OK).json(`Job is deleted`);
    } catch (error) {
        
        return response.status(HttpStatusCode.NOT_FOUND).json(`Impossible de recuperer les jobs`);
    }    
}