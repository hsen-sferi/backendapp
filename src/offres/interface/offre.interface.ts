import { Document } from "mongoose";

export interface Ioffre extends Document{
    
    title:string;
    description:string;
    salary:number;
    requirement:string[];
}