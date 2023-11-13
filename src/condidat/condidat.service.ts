import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Icondidat } from './interface/interface.condidat';
import { CreatecondidatDTo } from './dto/create-condidat.dto';
import { UpdatecondidatDto } from './dto/update-condidat.dto';

@Injectable()
export class condidatService {
  
  constructor(@InjectModel("user") private condidatModel:Model<Icondidat>){}




    async Createcondidat (CreatecondidatDto:CreatecondidatDTo):Promise<Icondidat> {
      const newcondidat =await new this.condidatModel(CreatecondidatDto);
      return newcondidat.save();
    }
  
    async Updatecondidat (condidatId:string, UpdatecondidatDto:UpdatecondidatDto):Promise<Icondidat>{
      const existingcondidat=await this.condidatModel.findByIdAndUpdate(condidatId ,UpdatecondidatDto,{new:true});
        
      if(!existingcondidat){
        throw new NotFoundException('condidat Data Not Found');
      }
      return existingcondidat;
    }

    async GetAllcondidats():Promise<Icondidat[]>{
      const condidatData = await this.condidatModel.find({role:"condidat"}).select("-__v")
      if (!condidatData || condidatData.length==0){
        throw new NotFoundException('condidat Data Not Found !');
      }
      return condidatData
    }

    async Findbycondidatname(condidatname:string):Promise<Icondidat>{
      const condidat=await this.condidatModel.findOne({condidatname})
      return condidat
    }

    async Getcondidat (condidatId:string):Promise<Icondidat>{
      const existingcondidat = await this.condidatModel.findById(condidatId).exec();
      if (!existingcondidat){
        throw new NotFoundException(`condidat #${condidatId} Not Found !`)
      }
      return existingcondidat;
    }


    async deletecondidat (condidatId:string):Promise<Icondidat>{
      const deletecondidat= await this.condidatModel.findByIdAndDelete(condidatId)
      if (!deletecondidat){
        throw new NotFoundException(`condidat #${condidatId} Not Found !`)
      }
      return deletecondidat
    }
  }