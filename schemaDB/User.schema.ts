
import mongoose from 'mongoose';
import { User } from "../models/User.model";
const uniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema<User>({

    email : {type : String, required: true, unique:true},
    password : {type : String, required: true},

}, {timestamps : true}); /*>This last line create automatilly : created_at, updated_at*/

//Pour améliorer les messages d'erreur lors de l'enregistrement de données uniques.
userSchema.plugin(uniqueValidator);

const UserTable:mongoose.Model<User>  = mongoose.model('User', userSchema);

export default UserTable;