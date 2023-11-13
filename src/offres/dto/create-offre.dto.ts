import { IsString,IsNotEmpty} from "class-validator";



export class CreateoffreDto {
@IsString()
@IsNotEmpty()
title:string;

@IsString()
@IsNotEmpty()
description:string;

@IsString()
@IsNotEmpty()
salary:number;

@IsString()
@IsNotEmpty()
requirement:string[];

}
