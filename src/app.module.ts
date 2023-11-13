import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { userModule } from './user/user.module';
import { offreModule } from './offres/offres.module';
import { condidatModule } from './condidat/condidat.module';
import { ConfigModule } from '@nestjs/config';
import { entrepriseModule } from './entreprise/entreprise.module';
import { QuizModule } from './quiz/quiz.module';



@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017",{dbName:"my_database"}), offreModule, userModule, AdminModule,condidatModule,entrepriseModule,QuizModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
