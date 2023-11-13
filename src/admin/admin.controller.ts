import { Controller, Get,Put, Post, Body,Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, Query, Response } from '@nestjs/common';
import { adminService } from './admin.service';
import { CreateadminDTo } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('admin')
export class adminController {
  constructor(private readonly adminService: adminService) {}

@Post()

@UseInterceptors(
  FileInterceptor("file",{
    storage: diskStorage({
      destination:"./Upload/admin",
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)

  async createadmin (@Res() response , @Body() CreateadminDto:CreateadminDTo,@UploadedFile() file :Express.Multer.File){

  try{
    CreateadminDto.photo=file.filename;
    const newadmin = await this.adminService.Createadmin(CreateadminDto);

    return response.status(HttpStatus.CREATED).json({
      message : 'admin has been created successfully',
      status: HttpStatus.CREATED,
      data:newadmin
    });
  }
  
  catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      status:400,
      message:'error ; admin not created'+err,
      data:null
    });
  }
}

  @Put('/:id')

  async updateadmin(@Res() response,@Param("id") adminId:string , @Body() UpdateadminDto:UpdateAdminDto){
    try{
      const existingadmin = await this.adminService.Updateadmin(adminId,UpdateadminDto);
      return response.status(HttpStatus.OK).json({
        message : 'admin has been Updated successfully',
        status: HttpStatus.OK,
        data:existingadmin
      });
    }catch(err){
      return response.status(err.status).json({
        message :err.response,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  } 

  @Get("/getbyadminname")

async findbyadminname(@Res() Response ,@Query("adminname") adminname:string){
  try {
    const existingadmin = await this.adminService.Findbyadminname(adminname)
    return Response.status(HttpStatus.OK).json({
        message :" admin Found Succesfully",
        status: HttpStatus.OK,
        data:existingadmin
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
  
async getadmins(@Res() Response){
  try {
    const adminData = await this.adminService.GetAlladmins()
    return Response.status(HttpStatus.OK).json({
        message :"All admins Data Found ",
        status: HttpStatus.OK,
        data:adminData
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
  
async getadmin(@Res() Response, @Param("id") adminId:string){
  try {
    const existingadmin = await this.adminService.Getadmin(adminId)
    return Response.status(HttpStatus.OK).json({
        message :" admin Found Succesfully",
        status: HttpStatus.OK,
        data:existingadmin
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
  
async deleteadmin(@Res() Response, @Param("id") adminId:string){
  try {
    const deleteadmin = await this.adminService.deleteadmin(adminId)
    return Response.status(HttpStatus.OK).json({
        message :" admin Deleted Succesfully",
        status: HttpStatus.OK,
        data:deleteadmin
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
