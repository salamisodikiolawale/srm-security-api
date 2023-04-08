import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import { JobDTO } from "../dto/Job.dto";
import { HttpStatusCode } from "../enums/HttpStatusCode";
import Logger from "../loggers/Logger";
import jobService from "../services/job.service";

export const createJob = async (request:Request, response:Response, next:NextFunction) => {

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