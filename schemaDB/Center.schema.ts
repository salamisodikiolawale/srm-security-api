
import mongoose from 'mongoose';
import { Center } from "../models/Center.model";
const uniqueValidator = require('mongoose-unique-validator');


const centerSchema = new mongoose.Schema<Center>({

    userId : {type : String, required: true},
    name : {type : String, required: true},
    description: {type : String, required: true},
    createdDate : {type : String, required: true},
    website : {type : String, required: true},
    address : {type : String, required: true},
    trainer : {type : Boolean, required: true},
    trainee : {type : Boolean, required: true},
    center : {type : Boolean, required: true},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

//Pour améliorer les messages d'erreur lors de l'enregistrement de données uniques.
centerSchema.plugin(uniqueValidator);

const CenterTable:mongoose.Model<Center>  = mongoose.model('Center', centerSchema);

export default CenterTable;
