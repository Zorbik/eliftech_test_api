import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { USER_NOT_FOUND_ERROR } from './user.constants';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getOrders(phone: string, email: string) {
    return await this.userModel
      .findOne({ $or: [{ phone }, { email }] })
      .populate('orders')
      .orFail(new Error(USER_NOT_FOUND_ERROR));
  }

  async createOrUpdateUser(
    phone: string,
    email: string,
    order: CreateOrderDto,
  ): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { $or: [{ phone }, { email }] },
      { phone, email, order },
      { upsert: true, new: true },
    );
  }
}
