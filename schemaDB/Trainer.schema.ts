
import mongoose from 'mongoose';
import { Trainer } from '../models/Trainer.model';
const uniqueValidator = require('mongoose-unique-validator');


const trainerSchema = new mongoose.Schema<Trainer>({

    userId : {type : String, required: true},
    name : {type : String, required: true},
    lastName : {type : String, required: true},
    address : {type : String, required: true},
    experience : {type : Number, required: true},
    trainer : {type : Boolean, required: true},
    trainee : {type : Boolean, required: true},
    center : {type : Boolean, required: true},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

//Pour améliorer les messages d'erreur lors de l'enregistrement de données uniques.
trainerSchema.plugin(uniqueValidator);

const TrainerTable:mongoose.Model<Trainer>  = mongoose.model('Trainer', trainerSchema);

export default TrainerTable;
