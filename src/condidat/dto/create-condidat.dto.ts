import { IsString,IsNotEmpty } from "class-validator";
import { CreateuserDto } from "src/user/dto/create-user.dto";

export class CreatecondidatDTo extends CreateuserDto{

    @IsString()
    @IsNotEmpty()
    role:string;
    
    @IsString()
    @IsNotEmpty()
        location:string
    
        @IsString()
    @IsNotEmpty()
        description:string
    
}