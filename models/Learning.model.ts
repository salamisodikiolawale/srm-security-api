export interface Learning {

    _id?:string;
    centerId : string,
    title : string,
    description : string,
    type : string;
    modulesIds: string[];
    createdAt?: string;
    updatedAt?: string;
  __v?: string|number
}