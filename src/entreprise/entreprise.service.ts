import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ientreprise } from './interface/entreprise.interface';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';

@Injectable()
export class entrepriseService {
  
  constructor(@InjectModel("user") private entrepriseModel:Model<Ientreprise>){}




    async Createentreprise (CreateentrepriseDto:CreateEntrepriseDto):Promise<Ientreprise> {
      const newentreprise =await new this.entrepriseModel(CreateentrepriseDto);
      return newentreprise.save();
    }
  
    async Updateentreprise (entrepriseId:string, UpdateentrepriseDto:UpdateEntrepriseDto):Promise<Ientreprise>{
      const existingentreprise=await this.entrepriseModel.findByIdAndUpdate(entrepriseId ,UpdateentrepriseDto,{new:true});
        
      if(!existingentreprise){
        throw new NotFoundException('entreprise Data Not Found');
      }
      return existingentreprise;
    }

    async GetAllentreprises():Promise<Ientreprise[]>{
      const entrepriseData = await this.entrepriseModel.find({role:"entreprise"}).select("-__v")
      if (!entrepriseData || entrepriseData.length==0){
        throw new NotFoundException('entreprise Data Not Found !');
      }
      return entrepriseData
    }

    async Findbyentreprisename(entreprisename:string):Promise<Ientreprise>{
      const entreprise=await this.entrepriseModel.findOne({entreprisename})
      return entreprise
    }

    async Getentreprise (entrepriseId:string):Promise<Ientreprise>{
      const existingentreprise = await this.entrepriseModel.findById(entrepriseId).exec();
      if (!existingentreprise){
        throw new NotFoundException(`entreprise #${entrepriseId} Not Found !`)
      }
      return existingentreprise;
    }


    async deleteentreprise (entrepriseId:string):Promise<Ientreprise>{
      const deleteentreprise= await this.entrepriseModel.findByIdAndDelete(entrepriseId)
      if (!deleteentreprise){
        throw new NotFoundException(`entreprise #${entrepriseId} Not Found !`)
      }
      return deleteentreprise
    }
  }