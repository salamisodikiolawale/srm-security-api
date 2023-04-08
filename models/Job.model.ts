export interface Job{

    _id?:string;
    centerId?:string;
    title:string;
    salary:Number;
    startingDate:string;
    contractType:string;
    description:string;
    benefits:string;
    workingHours:string;
    requireProfile:string;
    image:string;
    createdAt?: string;
    updatedAt?: string;
  __v?: string|number
}
