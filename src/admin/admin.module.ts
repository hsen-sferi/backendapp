import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { adminController } from './admin.controller';
import { adminService } from './admin.service';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"user",schema:UserSchema}])],
  controllers: [adminController],
  providers: [adminService],
})
export class AdminModule {}
