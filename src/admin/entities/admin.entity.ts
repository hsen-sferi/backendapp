import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})
export class adminEntity   {

    role:string;

    
}

export const adminSchema = SchemaFactory.createForClass(adminEntity)

