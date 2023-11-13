import { Schema,Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose/dist/factories";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class offreentity  {

@Prop({required:true})
    title:string;

@Prop({required:true})
    description:string;

@Prop({required:true})
    salary:number;

@Prop({required:true})
    requirment:string[]

}
export const offreSchema = SchemaFactory.createForClass(offreentity)