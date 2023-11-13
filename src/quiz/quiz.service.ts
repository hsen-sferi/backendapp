import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iquiz } from './interface/quiz.interface';
import { CreatequizDto } from './dto/create-quiz.dto';
import { UpdatequizDto } from './dto/update-quiz.dto';

@Injectable()

export class quizsService {
  constructor(@InjectModel("quiz") private quizModel:Model<Iquiz>){}

  async Createquiz (createquizDto:CreatequizDto):Promise<any>{
    const newquiz=await new this.quizModel(createquizDto)
    await newquiz.save();
  }

  async Updatequiz (quizId:string, UpdatequizDto:UpdatequizDto):Promise<Iquiz>{
    const existingquiz=await this.quizModel.findByIdAndUpdate(quizId,UpdatequizDto,{new:true});
      if(!existingquiz){
      throw new NotFoundException('quiz Data Not Found');
    }
    return existingquiz;
  }

  async GetAllquizs():Promise<Iquiz[]>{
    const quizData = await this.quizModel.find().select("-__v")
    if (!quizData){
      throw new NotFoundException('quiz Data Not Found !');
    }
    return quizData
  }

  async Getquiz (quizId:string):Promise<Iquiz>{
    const existingquiz = await this.quizModel.findById(quizId).exec();
    if (!existingquiz){
      throw new NotFoundException(`quiz #${quizId} Not Found !`)
    }
    return existingquiz;
  }

  async deletequiz (quizId:string):Promise<Iquiz>{
    const deletequiz= await this.quizModel.findByIdAndDelete(quizId)
    if (!deletequiz){
      throw new NotFoundException(`quiz #${quizId} Not Found !`)
    }
    return deletequiz
  }
}
