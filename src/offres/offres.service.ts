import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ioffre } from './interface/offre.interface';
import { CreateoffreDto } from './dto/create-offre.dto';
import { UpdateoffreDto } from './dto/update-offre.dto';

@Injectable()

export class offresService {
  constructor(@InjectModel("offre") private offreModel:Model<Ioffre>){}

  async Createoffre (createoffreDto:CreateoffreDto):Promise<any>{
    const newoffre=await new this.offreModel(createoffreDto)
    await newoffre.save();
  }

  async Updateoffre (offreId:string, UpdateoffreDto:UpdateoffreDto):Promise<Ioffre>{
    const existingoffre=await this.offreModel.findByIdAndUpdate(offreId,UpdateoffreDto,{new:true});
      if(!existingoffre){
      throw new NotFoundException('offre Data Not Found');
    }
    return existingoffre;
  }

  async GetAlloffres():Promise<Ioffre[]>{
    const offreData = await this.offreModel.find().select("-__v")
    if (!offreData){
      throw new NotFoundException('Offre Data Not Found !');
    }
    return offreData
  }

  async Getoffre (offreId:string):Promise<Ioffre>{
    const existingoffre = await this.offreModel.findById(offreId).exec();
    if (!existingoffre){
      throw new NotFoundException(`offre #${offreId} Not Found !`)
    }
    return existingoffre;
  }

  async deleteoffre (offreId:string):Promise<Ioffre>{
    const deleteoffre= await this.offreModel.findByIdAndDelete(offreId)
    if (!deleteoffre){
      throw new NotFoundException(`Offre #${offreId} Not Found !`)
    }
    return deleteoffre
  }
}
