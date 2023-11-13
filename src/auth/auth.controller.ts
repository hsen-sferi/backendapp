import { Body, Controller, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { diskStorage } from "multer";
import { use } from "passport";
import { CreateuserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { CreateAuthentificationDto } from "./dto/create-login.dto";
import { RefreshTokenGuard } from "./common/guards/refreshToken.guard";
import { Request } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { AccessTokenGuard } from "./common/guards/accesToken.guard";





@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@Post("SignUp")

@UseInterceptors(
  FileInterceptor("file",{
    storage: diskStorage({
      destination:"./Upload/User",
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)

async signup (@Body() CreateuserDto:CreateuserDto,@UploadedFile() File){
    CreateuserDto.photo=File.filename;
    const user=await this.authService.SignUp(CreateuserDto);
    return user
}

@Post("Signin")

Signin(@Body() data:CreateAuthentificationDto){
  return this.authService.SignIn(data)
}


@UseGuards(AccessTokenGuard)

@Get("Logout")
Logout(@Req() req:Request){
  this.authService.Logout(req.user["sub"])
}



@UseGuards(RefreshTokenGuard)

@Get("refresh")
refreshTokens(@Req() req:Request){
  const userId=req.user["sub"];
  const refreshToken=req.user["refreshToken"];
  
  return this.authService.refreshTokens(userId ,refreshToken);
}





}
