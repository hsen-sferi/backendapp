import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { condidatController } from './condidat.controller';
import { condidatService } from './condidat.service';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"user",schema:UserSchema}])],
  controllers: [condidatController],
  providers: [condidatService],
})
export class condidatModule {}

