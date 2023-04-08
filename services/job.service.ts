//----Data transfert object

//----Models

//----Database schema

//----transformers
import { Job } from '../models/Job.model';
import JobTable from '../schemaDB/Job.schema';
import { JobDTO } from '../dto/Job.dto';
import { jobTransformer } from '../transformers/job.transormer';

class JobService {
   
    
    constructor(){}


    async createJob(jobDto: JobDTO) {

        const job:Job = jobTransformer(jobDto);
        const newJob = new JobTable<Job>(job);
            
        return await newJob.save();
    }
}

export default new JobService();