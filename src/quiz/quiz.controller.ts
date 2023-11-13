import { Controller, Get,Put, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { quizsService } from './quiz.service';
import { CreatequizDto } from './dto/create-quiz.dto';
import { UpdatequizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class quizsController {
  constructor(private readonly quizsService: quizsService) {}


  @Post()
  async createquiz (@Res() response , @Body() createquizDto:CreatequizDto){

  try{
    const newquiz = await this.quizsService.Createquiz(createquizDto);

    return response.status(HttpStatus.CREATED).json({
      message : 'quiz has been created successfully',
      status: HttpStatus.CREATED,
      data:newquiz
    });
  }
  
  catch(err){
    return response.status(HttpStatus.BAD_REQUEST).json({
      status:400,
      message:'error ; quiz not created'+err,
      data:null
    });
  }
}

  @Put('/:id')

  async updatequiz(@Res() response,@Param("id") quizId:string , @Body() UpdatequizDto:UpdatequizDto){
    try{
      const existingquiz = await this.quizsService.Updatequiz(quizId,UpdatequizDto);
      return response.status(HttpStatus.OK).json({
        message : 'quiz has been Updated successfully',
        status: HttpStatus.OK,
        data:existingquiz
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
  
async getquizs(@Res() Response){
  try {
    const quizData = await this.quizsService.GetAllquizs()
    return Response.status(HttpStatus.OK).json({
        message :"All quizs Data Found ",
        status: HttpStatus.OK,
        data:quizData
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
  
async getquiz(@Res() Response, @Param("id") quizId:string){
  try {
    const existingquiz = await this.quizsService.Getquiz(quizId)
    return Response.status(HttpStatus.OK).json({
        message :" quiz Found Succesfully",
        status: HttpStatus.OK,
        data:existingquiz
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
  
async deletequiz(@Res() Response, @Param("id") quizId:string){
  try {
    const deletequiz = await this.quizsService.deletequiz(quizId)
    return Response.status(HttpStatus.OK).json({
        message :" quiz Deleted Succesfully",
        status: HttpStatus.OK,
        data:deletequiz
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


export { quizsService };
