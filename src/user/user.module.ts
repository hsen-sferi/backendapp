import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userController } from './user.controller';
import { userService } from './user.service';
import { UserSchema } from './entities/user.entity';
import {  adminSchema } from 'src/admin/entities/admin.entity';
import { condidatSchema } from 'src/condidat/entities/condidat.entity';
import { entrepriseSchema } from 'src/entreprise/entities/entreprise.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'user', schema: UserSchema, discriminators: [
        {name: 'admin', schema: adminSchema},
        {name: 'condidat', schema: condidatSchema},
        {name: 'entreprise', schema: entrepriseSchema},
      ]},
    ]),
  ],
  controllers: [userController],
  providers: [userService],
  
})
export class userModule {}
