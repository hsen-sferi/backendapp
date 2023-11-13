import { IsString,IsNotEmpty} from "class-validator";



export class CreateuserDto {
@IsString()
@IsNotEmpty()
    username:string;

@IsString()
@IsNotEmpty()
    email:string;

@IsString()
@IsNotEmpty()
    password:string;

@IsString()
@IsNotEmpty()
    photo:string


@IsString()
@IsNotEmpty()
    refreshToken:string

}
