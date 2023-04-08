
import mongoose from 'mongoose';
import { Center } from "../models/Center.model";
import { Job } from '../models/Job.model';
const uniqueValidator = require('mongoose-unique-validator');


const jobSchema = new mongoose.Schema<Job>({

    centerId : {type : String, required: true},
    title : {type : String, required: true},
    salary: {type : Number, required: true},
    startingDate : {type : String, required: true},
    contractType : {type : String, required: true},
    description : {type : String, required: true},
    benefits : {type : String, required: true},
    workingHours : {type : String, required: true},
    requireProfile : {type : String, required: true},
    image : {type : String, required: false},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

//Pour améliorer les messages d'erreur lors de l'enregistrement de données uniques.
jobSchema.plugin(uniqueValidator);

const JobTable:mongoose.Model<Job>  = mongoose.model('Job', jobSchema);

export default JobTable;
