import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps:true})
export class entrepriseEntity  {

    role:string;

    @Prop({required:true})
    location:string;

    @Prop()
    description:string;
}

export const entrepriseSchema = SchemaFactory.createForClass(entrepriseEntity)