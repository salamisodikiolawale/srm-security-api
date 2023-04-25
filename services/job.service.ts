//----Data transfert object

//----Models

//----Database schema

//----transformers
import { Job } from '../models/Job.model';
import JobTable from '../schemaDB/Job.schema';
import { JobDTO } from '../dto/Job.dto';
import { jobTransformer } from '../transformers/job.transormer';
import userService from './user.service';
import { Center } from '../models/Center.model';
import { response } from 'express';
import { HttpStatusCode } from '../enums/HttpStatusCode';

class JobService {
    
    
    constructor(){}


    async createJob(jobDto: JobDTO) {

        const job:Job = jobTransformer(jobDto);
        const newJob = new JobTable<Job>(job);
            
        return await newJob.save();
    }

    async getJobsByCenter(userId:string|undefined) {

        if(userId) {
            const center:Center|null = await userService.getCenter(userId);
            let centerId:string = '';
            if(!center){

                return response.status(HttpStatusCode.UNAUTHORISED).json(`Vous n'êtes pas autorisé`);
            }
            centerId = center?._id? center?._id: ''
            return await JobTable.find({'centerId':centerId});
        }
    }

    async getJobs() {

        return await JobTable.find();
    }

    async deleteJobByCenter(jobId:string|undefined, userId:string|undefined) {

        if(userId) {
            const center:Center|null = await userService.getCenter(userId);;
            let centerId:string = '';
            if(!center){

                return response.status(HttpStatusCode.UNAUTHORISED).json(`Vous n'êtes pas autorisé`);
            }
            centerId = center?._id? center?._id: ''
            // if(centerId === )
            return await JobTable.deleteOne({'_id':jobId});
        }
    }
}

export default new JobService();