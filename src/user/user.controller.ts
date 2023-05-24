import { Body, Get, Post, Query } from '@nestjs/common/decorators';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('orders')
  async getOrdersByPhoneOrEmail(
    @Query('phone') phone: string,
    @Query('email') email: string,
  ) {
    return await this.userService.getOrders(phone, email);
  }

  @Post('create')
  async createOrUpdateUser(@Body() userData: UserDto): Promise<User> {
    const { phone, email, order } = userData;
    const user = await this.userService.createOrUpdateUser(phone, email, order);
    return user;
  }
}
