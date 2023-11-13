import { IsString,IsNotEmpty} from "class-validator";



export class CreatequizDto {
@IsString()
@IsNotEmpty()
title:string;

@IsString()
@IsNotEmpty()
question:string;

@IsString()
@IsNotEmpty()
answer:boolean;


}
