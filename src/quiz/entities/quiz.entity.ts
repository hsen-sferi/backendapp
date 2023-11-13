import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose/dist/factories";

export class quizentity {
    @Prop({unique:true,required:true})
        title:string;

    @Prop({unique:true,required:true})
        question:string;

    @Prop({required:true})
        answer:boolean;
}
export const quizSchema = SchemaFactory.createForClass(quizentity)