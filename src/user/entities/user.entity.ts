import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as argon2 from'argon2'


@Schema({timestamps:true , discriminatorKey:"role"})
export class userEntity  {

    @Prop({type:String  , enum:["admin","condidat","entreprise"]})
    role:string;

    @Prop({required:true,unique:true})
    username:string;

    @Prop({required:true})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({required:true})
    photo:string;

    @Prop({})
    refreshToken:string;


}

export const UserSchema = SchemaFactory.createForClass(userEntity).pre("save", async function () {
    this.password = await argon2.hash(this.password);
 });