import { GlobalUser } from "./Global.model";

export interface Trainee extends GlobalUser {

    _id?:string;
    userId?:string;
    name:string;
    lastName:string;
    address:string;
    trainer:boolean;
    trainee:boolean;
    center:boolean;
    createdAt?: string;
    updatedAt?: string;
  __v?: string|number
}