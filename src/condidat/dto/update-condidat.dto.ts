import { PartialType } from '@nestjs/mapped-types';
import { CreatecondidatDTo } from './create-condidat.dto';

export class UpdatecondidatDto extends PartialType(CreatecondidatDTo) {}
