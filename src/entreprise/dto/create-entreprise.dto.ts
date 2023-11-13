import { IsNotEmpty, IsString } from "class-validator";
import { CreateuserDto } from "src/user/dto/create-user.dto";

export class CreateEntrepriseDto extends CreateuserDto{
    
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
