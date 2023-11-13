import { Module } from '@nestjs/common';
import { quizsService } from './quiz.controller';
import { quizsController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { quizSchema } from './entities/quiz.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'quiz', schema: quizSchema}])],
  controllers: [quizsController],
  providers: [quizsService],
})
export class QuizModule {}
