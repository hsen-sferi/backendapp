import { Injectable,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iadmin } from './interface/admin.interface';
import { CreateadminDTo } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class adminService {
  
  constructor(@InjectModel("user") private adminModel:Model<Iadmin>){}




    async Createadmin (CreateadminDto:CreateadminDTo):Promise<Iadmin> {
      const newadmin =await new this.adminModel(CreateadminDto);
      return newadmin.save();
    }
  
    async Updateadmin (adminId:string, UpdateadminDto:UpdateAdminDto):Promise<Iadmin>{
      const existingadmin=await this.adminModel.findByIdAndUpdate(adminId ,UpdateadminDto,{new:true});
        
      if(!existingadmin){
        throw new NotFoundException('admin Data Not Found');
      }
      return existingadmin;
    }

    async GetAlladmins():Promise<Iadmin[]>{
      const adminData = await this.adminModel.find({role:"admin"}).select("-__v")
      if (!adminData || adminData.length==0){
        throw new NotFoundException('admin Data Not Found !');
      }
      return adminData
    }

    async Findbyadminname(adminname:string):Promise<Iadmin>{
      const admin=await this.adminModel.findOne({adminname})
      return admin
    }

    async Getadmin (adminId:string):Promise<Iadmin>{
      const existingadmin = await this.adminModel.findById(adminId).exec();
      if (!existingadmin){
        throw new NotFoundException(`admin #${adminId} Not Found !`)
      }
      return existingadmin;
    }


    async deleteadmin (adminId:string):Promise<Iadmin>{
      const deleteadmin= await this.adminModel.findByIdAndDelete(adminId)
      if (!deleteadmin){
        throw new NotFoundException(`admin #${adminId} Not Found !`)
      }
      return deleteadmin
    }
  }