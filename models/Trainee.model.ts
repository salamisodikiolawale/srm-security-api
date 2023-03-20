export interface Trainee {

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