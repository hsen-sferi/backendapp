import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema({timestamps:true})
export class condidatEntity    {

    role:string;

    @Prop({required:true})
    location:string;

    @Prop()
    description:string;
}

export const condidatSchema = SchemaFactory.createForClass(condidatEntity)

