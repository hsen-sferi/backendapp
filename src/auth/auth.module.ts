import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userModule } from 'src/user/user.module';
import { userService } from 'src/user/user.service';
@Module({
  imports: [userModule],
  controllers: [AuthController],
  providers: [AuthService, userService], 
})
export class AuthModule {}
