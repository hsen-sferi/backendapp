import { JwtService } from "@nestjs/jwt";
import { CreateuserDto } from "src/user/dto/create-user.dto";
import {}
import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common/exceptions";
import { Injectable } from "@nestjs/common/decorators";
import * as argon2 from 'argon2';
import { CreateAuthentificationDto } from "./dto/create-login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Iuser } from "src/user/interface/user.interface";

@Injectable()
export class AuthService {
  constructor(
    // private userModel: userModel, 
    private JwtService: JwtService,
    // @InjectModel("user") private userModel: userModel<Iuser>
  ) {}

async SignUp(CreateuserDto:CreateuserDto): Promise<any> {
  const userExists =await this.userModel.find(CreateuserDto.username);
  if(userExists){
    throw new BadRequestException("User Already Exists")
  }

  const newUser = await this.userModel.Createuser(CreateuserDto);
  const tokens = await this.getTokens(newUser._id,newUser.username);
  await this.updateRefreshToken(newUser._id,tokens.refreshToken);
  return{tokens,newUser};

}


async SignIn (data: CreateAuthentificationDto){


const user = await this.userModel.Findbyusername(data.username);

if (!user) throw new BadRequestException('user does not exist');
  const PasswordMatches =await argon2.verify(user.password , data.password)


  if(!PasswordMatches)
  throw new BadRequestException('Password is incorrect');



  const tokens=await this.getTokens(user._id , user.username);
  await this.updateRefreshToken(user._id  , tokens.refreshToken);
  return {tokens,user}

}


async Logout (userId:string){
  this.userModel.Updateuser(userId , {refreshToken:null})
}


async getTokens(userId:string , username:string){

const [accesToken , refreshToken] =await Promise.all([
  this.JwtService.signAsync(
    {
      sub:userId,
      username,
    },
    {
      secret:"example",
      expiresIn:'7d',
    },
    ),
    this.JwtService.signAsync(
    {
      sub:userId,
      username,
    },
    {
      secret:"example",
      expiresIn:'7d',
    },
  )
])
return {refreshToken,accesToken}

}


async refreshTokens(userId:string , refreshToken:string){

  const user=await this.userModel.Getuser(userId);
  if(!user || !user.refreshToken)
  throw new ForbiddenException("access denied");
const refreshTokenMatches = await argon2.verify(
  user.refreshToken,
  refreshToken,
);
  if(!refreshTokenMatches) 
  throw new ForbiddenException("access denied");
const tokens= await this.getTokens(user._id , user.username);
await this.updateRefreshToken(user._id , tokens.refreshToken)

return tokens;
}

hashData(data:string){
  return argon2.hash(data)
}

async updateRefreshToken(userId:string , refreshToken:string){
  const hashedRefreshToken = await this.hashData(refreshToken);

  await this.userModel.Updateuser(userId,{
    refreshToken:hashedRefreshToken,
  });
}

}   