import { JobDTO } from "../dto/Job.dto";
import { Job } from "../models/Job.model";

export const jobTransformer = (jobDto: JobDTO) => {

    const jobModel:Job = {

        centerId: jobDto.centerId,
        title: jobDto.title,
        salary:  jobDto.salary,
        startingDate: jobDto.startingDate,
        contractType: jobDto.contractType,
        description: jobDto.description,
        benefits: jobDto.benefits,
        workingHours: jobDto.workingHours,
        requireProfile: jobDto.requireProfile,
        image: jobDto.image,
    }
    
    return jobModel;
}