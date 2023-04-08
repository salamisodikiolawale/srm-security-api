
import mongoose from 'mongoose';
import { Center } from "../models/Center.model";
import { Job } from '../models/Job.model';
import { Learning } from '../models/Learning.model';
const uniqueValidator = require('mongoose-unique-validator');


const learningSchema = new mongoose.Schema<Learning>({

    centerId : {type : String, required: true},
    title : {type : String, required: true},
    description : {type : String, required: true},
    type : {type : String, required: true},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

//Pour améliorer les messages d'erreur lors de l'enregistrement de données uniques.
learningSchema.plugin(uniqueValidator);

const LearningTable:mongoose.Model<Learning>  = mongoose.model('Learning', learningSchema);

export default LearningTable;
