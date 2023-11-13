import { IsString,IsNotEmpty } from "class-validator";
import { CreateuserDto } from "src/user/dto/create-user.dto";

export class CreateadminDTo extends CreateuserDto{

    @IsString()
    @IsNotEmpty()
    role:string;

   
    
    }