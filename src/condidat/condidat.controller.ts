import { Controller, Get,Put, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, Query, Response } from '@nestjs/common';
import { condidatService } from './condidat.service';
import { CreatecondidatDTo } from './dto/create-condidat.dto';
import { UpdatecondidatDto } from './dto/update-condidat.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('condidat')
export class condidatController {
  constructor(private readonly condidatService: condidatService) {}

@Post()

@UseInterceptors(
  FileInterceptor("file",{
    storage: diskStorage({
      destination:"./Upload/condidat",
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)

  async createcondidat (@Res() response , @Body() CreatecondidatDto:CreatecondidatDTo,@UploadedFile() file :Express.Multer.File){

  try{
    CreatecondidatDto.photo=file.filename;
    const newcondidat = await this.condidatService.Createcondidat(CreatecondidatDto);

    return response.status(HttpStatus.CREATED).json({
      message : 'condidat has been created successfully',
      status: HttpStatus.CREATED,
      data:newcondidat
    });
  }
  
  catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      status:400,
      message:'error ; condidat not created'+err,
      data:null
    });
  }
}

  @Put('/:id')

  async updatecondidat(@Res() response,@Param("id") condidatId:string , @Body() UpdatecondidatDto:UpdatecondidatDto){
    try{
      const existingcondidat = await this.condidatService.Updatecondidat(condidatId,UpdatecondidatDto);
      return response.status(HttpStatus.OK).json({
        message : 'condidat has been Updated successfully',
        status: HttpStatus.OK,
        data:existingcondidat
      });
    }catch(err){
      return response.status(err.status).json({
        message :err.response,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  } 

  @Get("/getbycondidatname")

async findbycondidatname(@Res() Response ,@Query("condidatname") condidatname:string){
  try {
    const existingcondidat = await this.condidatService.Findbycondidatname(condidatname)
    return Response.status(HttpStatus.OK).json({
        message :" condidat Found Succesfully",
        status: HttpStatus.OK,
        data:existingcondidat
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
  
async getcondidats(@Res() Response){
  try {
    const condidatData = await this.condidatService.GetAllcondidats()
    return Response.status(HttpStatus.OK).json({
        message :"All condidats Data Found ",
        status: HttpStatus.OK,
        data:condidatData
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
  
async getcondidat(@Res() Response, @Param("id") condidatId:string){
  try {
    const existingcondidat = await this.condidatService.Getcondidat(condidatId)
    return Response.status(HttpStatus.OK).json({
        message :" condidat Found Succesfully",
        status: HttpStatus.OK,
        data:existingcondidat
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
  
async deletecondidat(@Res() Response, @Param("id") condidatId:string){
  try {
    const deletecondidat = await this.condidatService.deletecondidat(condidatId)
    return Response.status(HttpStatus.OK).json({
        message :" condidat Deleted Succesfully",
        status: HttpStatus.OK,
        data:deletecondidat
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
