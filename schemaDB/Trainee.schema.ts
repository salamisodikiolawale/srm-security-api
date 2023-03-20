
import mongoose from 'mongoose';
import { Trainee } from "../models/Trainee.model";
const uniqueValidator = require('mongoose-unique-validator');


const traineeSchema = new mongoose.Schema<Trainee>({

    userId : {type : String, required: true},
    name : {type : String, required: true},
    lastName : {type : String, required: true},
    address : {type : String, required: true},
    trainer : {type : Boolean, required: true},
    trainee : {type : Boolean, required: true},
    center : {type : Boolean, required: true},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

//Pour améliorer les messages d'erreur lors de l'enregistrement de données uniques.
traineeSchema.plugin(uniqueValidator);

const TraineeTable:mongoose.Model<Trainee>  = mongoose.model('Trainee', traineeSchema);

export default TraineeTable;
