export interface Trainer {

    _id?:string;
    userId?:string;
    name:string;
    lastName:string;
    experience:number;
    address:string;
    trainer:boolean;
    trainee:boolean;
    center:boolean;
    createdAt?: string;
    updatedAt?: string;
  __v?: string|number
}