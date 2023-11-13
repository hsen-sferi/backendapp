import { Controller, Get,Put, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, Query, Response } from '@nestjs/common';
import { entrepriseService } from './entreprise.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('entreprise')
export class entrepriseController {
  constructor(private readonly entrepriseService: entrepriseService) {}

@Post()

@UseInterceptors(
  FileInterceptor("file",{
    storage: diskStorage({
      destination:"./Upload/entreprise",
      filename: (_request, file, callback) =>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
    }),
  }),
)

  async createentreprise (@Res() response , @Body() CreateentrepriseDto:CreateEntrepriseDto,@UploadedFile() file :Express.Multer.File){

  try{
    CreateentrepriseDto.photo=file.filename;
    const newentreprise = await this.entrepriseService.Createentreprise(CreateentrepriseDto);

    return response.status(HttpStatus.CREATED).json({
      message : 'entreprise has been created successfully',
      status: HttpStatus.CREATED,
      data:newentreprise
    });
  }
  
  catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      status:400,
      message:'error ; entreprise not created'+err,
      data:null
    });
  }
}

  @Put('/:id')

  async updateentreprise(@Res() response,@Param("id") entrepriseId:string , @Body() UpdateentrepriseDto:UpdateEntrepriseDto){
    try{
      const existingentreprise = await this.entrepriseService.Updateentreprise(entrepriseId,UpdateentrepriseDto);
      return response.status(HttpStatus.OK).json({
        message : 'entreprise has been Updated successfully',
        status: HttpStatus.OK,
        data:existingentreprise
      });
    }catch(err){
      return response.status(err.status).json({
        message :err.response,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  } 

  @Get("/getbyentreprisename")

async findbyentreprisename(@Res() Response ,@Query("entreprisename") entreprisename:string){
  try {
    const existingentreprise = await this.entrepriseService.Findbyentreprisename(entreprisename)
    return Response.status(HttpStatus.OK).json({
        message :" entreprise Found Succesfully",
        status: HttpStatus.OK,
        data:existingentreprise
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
  
async getentreprises(@Res() Response){
  try {
    const entrepriseData = await this.entrepriseService.GetAllentreprises()
    return Response.status(HttpStatus.OK).json({
        message :"All entreprises Data Found ",
        status: HttpStatus.OK,
        data:entrepriseData
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
  
async getentreprise(@Res() Response, @Param("id") entrepriseId:string){
  try {
    const existingentreprise = await this.entrepriseService.Getentreprise(entrepriseId)
    return Response.status(HttpStatus.OK).json({
        message :" entreprise Found Succesfully",
        status: HttpStatus.OK,
        data:existingentreprise
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
  
async deleteentreprise(@Res() Response, @Param("id") entrepriseId:string){
  try {
    const deleteentreprise = await this.entrepriseService.deleteentreprise(entrepriseId)
    return Response.status(HttpStatus.OK).json({
        message :" entreprise Deleted Succesfully",
        status: HttpStatus.OK,
        data:deleteentreprise
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
