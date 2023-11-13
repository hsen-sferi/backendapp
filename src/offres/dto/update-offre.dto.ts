import { PartialType } from '@nestjs/mapped-types';
import { CreateoffreDto } from './create-offre.dto';

export class UpdateoffreDto extends PartialType(CreateoffreDto) {}
