import { Controller, Get,Put, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { offresService } from './offres.service';
import { CreateoffreDto } from './dto/create-offre.dto';
import { UpdateoffreDto } from './dto/update-offre.dto';

@Controller('offre')
export class offresController {
  constructor(private readonly offresService: offresService) {}


  @Post()
  async createoffre (@Res() response , @Body() createoffreDto:CreateoffreDto){

  try{
    const newoffre = await this.offresService.Createoffre(createoffreDto);

    return response.status(HttpStatus.CREATED).json({
      message : 'offre has been created successfully',
      status: HttpStatus.CREATED,
      data:newoffre
    });
  }
  
  catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      status:400,
      message:'error ; offre not created'+err,
      data:null
    });
  }
}

  @Put('/:id')

  async updateoffre(@Res() response,@Param("id") offreId:string , @Body() UpdateoffreDto:UpdateoffreDto){
    try{
      const existingoffre = await this.offresService.Updateoffre(offreId,UpdateoffreDto);
      return response.status(HttpStatus.OK).json({
        message : 'offre has been Updated successfully',
        status: HttpStatus.OK,
        data:existingoffre
      });
    }catch(err){
      return response.status(err.status).json({
        message :err.response,
        status: HttpStatus.BAD_REQUEST,
        data:null
      })
    }
  } 


@Get()
  
async getoffres(@Res() Response){
  try {
    const offreData = await this.offresService.GetAlloffres()
    return Response.status(HttpStatus.OK).json({
        message :"All offres Data Found ",
        status: HttpStatus.OK,
        data:offreData
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
  
async getoffre(@Res() Response, @Param("id") offreId:string){
  try {
    const existingoffre = await this.offresService.Getoffre(offreId)
    return Response.status(HttpStatus.OK).json({
        message :" offre Found Succesfully",
        status: HttpStatus.OK,
        data:existingoffre
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
  
async deleteoffre(@Res() Response, @Param("id") offreId:string){
  try {
    const deleteoffre = await this.offresService.deleteoffre(offreId)
    return Response.status(HttpStatus.OK).json({
        message :" offre Deleted Succesfully",
        status: HttpStatus.OK,
        data:deleteoffre
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


export { offresService };
