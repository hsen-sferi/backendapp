import { Document } from "mongoose";
export interface Iquiz extends Document{
    title:string;
    question:string;
    answer:boolean;
}