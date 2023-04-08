import { GlobalUser } from "./Global.model";

export interface Center extends GlobalUser {

    _id?:string;
    userId?:string;
    name:string;
    description:string;
    createdDate:string;
    website:string;
    address:string;
    trainer:boolean;
    trainee:boolean;
    center:boolean;
    createdAt?: string;
    updatedAt?: string;
  __v?: string|number
}