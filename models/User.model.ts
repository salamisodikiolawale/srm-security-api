export interface User {

    _id?:string;
    email:string;
    password:string;
    roles?: string[];
    createdAt?: string;
    updatedAt?: string;
  __v?: string|number
}
