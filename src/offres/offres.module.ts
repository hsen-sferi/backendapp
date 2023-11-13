import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { offreSchema } from './entities/offre.entity';
import { offresController } from './offres.controller';
import { offresService } from './offres.service'; 


@Module({
imports:[
  MongooseModule.forFeature([{ name:'offre' , schema:offreSchema}])
 ],
 controllers:[offresController ],
 providers:[offresService ],
})
export class offreModule {}
