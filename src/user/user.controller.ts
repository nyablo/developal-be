import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/database/user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req): Promise<User> {
    return this.userService.findOne(req.user.phoneNumber);
  }
}
