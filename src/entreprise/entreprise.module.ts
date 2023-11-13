import { Module } from '@nestjs/common';
import { entrepriseService } from './entreprise.service';
import { entrepriseController } from './entreprise.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"user",schema:UserSchema}])],
  controllers: [entrepriseController],
  providers: [entrepriseService],
})
export class entrepriseModule {}
