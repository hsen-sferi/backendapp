import { Controller, Get,Put, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, Query, Response, UploadedFiles } from '@nestjs/common';
import { userService } from './user.service';
import { CreateuserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import * as argon2 from 'argon2';

@Controller('user')
export class userController {
  constructor(private readonly userService: userService) {}

@Post()

@UseInterceptors(
  FileInterceptor("file",{
    storage: diskStorage({
      destination:"./Upload/User",
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)

  async createuser (@Res() response , @Body() CreateuserDto:CreateuserDto,@UploadedFile() file :Express.Multer.File){

  try{
    CreateuserDto.photo=file.filename;
    const newuser = await this.userService.Createuser(CreateuserDto);

    return response.status(HttpStatus.CREATED).json({
      message : 'user has been created successfully',
      status: HttpStatus.CREATED,
      data:newuser
    });
  }
  
  catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      status:400,
      message:'error ; user not created'+err,
      data:null
    });
  }
}

  @Put('/:id')


  @UseInterceptors(
    FileInterceptor("file",{
      storage: diskStorage({
        destination:"./Upload/User",
        filename: (_request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  

  async updateuser(@Res() response,@Param("id") userId:string , @Body() UpdateuserDto:UpdateuserDto , @UploadedFile() file){
    try{
      if(file==undefined || file == null){
        if(UpdateuserDto.password==undefined){
          UpdateuserDto.password=(await this.userService.Getuser(userId)).password;
        }else{
          UpdateuserDto.password=(await argon2.hash(UpdateuserDto.password))
        }
        UpdateuserDto.photo = (await this.userService.Getuser(userId)).photo;
        const existinguser = await this.userService.Updateuser(userId,UpdateuserDto);
      return response.status(HttpStatus.OK).json({
        message : 'user has been Updated successfully',
        status: HttpStatus.OK,
        data:existinguser
      });
      }
      else{
        if(UpdateuserDto.password==undefined){
          UpdateuserDto.password=(await this.userService.Getuser(userId)).password;
        }else{
          UpdateuserDto.password=(await argon2.hash(UpdateuserDto.password))
        }
        UpdateuserDto.photo =file.filename;
        const existinguser = await this.userService.Updateuser(userId,UpdateuserDto);
      return response.status(HttpStatus.OK).json({
        message : 'user has been Updated successfully',
        status: HttpStatus.OK,
        data:existinguser
      });
      }
      
    }catch(err){
      return response.status(err.status).json({
        message :err.response,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  } 

  @Get("/getbyusername")

async findbyusername(@Res() Response ,@Query("username") username:string){
  try {
    const existinguser = await this.userService.Findbyusername(username)
    return Response.status(HttpStatus.OK).json({
        message :" user Found Succesfully",
        status: HttpStatus.OK,
        data:existinguser
    })
  } catch (err) {
    return Response.status(err.status).json({
      message :err.response,
      status: HttpStatus.BAD_REQUEST,
      data:null
  })
  }
}

@Get()
  
async getusers(@Res() Response){
  try {
    const userData = await this.userService.GetAllusers()
    return Response.status(HttpStatus.OK).json({
        message :"All users Data Found ",
        status: HttpStatus.OK,
        data:userData
    })
  }catch(err){
    return Response.status(err.status).json({
      message :err.response,
      status: HttpStatus.BAD_REQUEST,
      data:null
  })
}
} 



@Get('/:id')
  
async getuser(@Res() Response, @Param("id") userId:string){
  try {
    const existinguser = await this.userService.Getuser(userId)
    return Response.status(HttpStatus.OK).json({
        message :" user Found Succesfully",
        status: HttpStatus.OK,
        data:existinguser
    })
  }catch(err){
    return Response.status(err.status).json({
      message :err.response,
      status: HttpStatus.BAD_REQUEST,
      data:null
  })
}
} 



@Delete('/:id')
  
async deleteuser(@Res() Response, @Param("id") userId:string){
  try {
    const deleteuser = await this.userService.deleteuser(userId)
    return Response.status(HttpStatus.OK).json({
        message :" user Deleted Succesfully",
        status: HttpStatus.OK,
        data:deleteuser
    })
  }catch(err){
    return Response.status(err.status).json({
      message :err.response,
      status: HttpStatus.BAD_REQUEST,
      data:null
  })
}
} 

} 
