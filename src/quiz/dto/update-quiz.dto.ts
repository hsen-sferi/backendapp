import { PartialType } from '@nestjs/mapped-types';
import { CreatequizDto } from './create-quiz.dto';

export class UpdatequizDto extends PartialType(CreatequizDto) {}
