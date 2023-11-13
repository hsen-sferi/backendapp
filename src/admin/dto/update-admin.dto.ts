import { PartialType } from '@nestjs/mapped-types';
import { CreateadminDTo } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateadminDTo) {}
