import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const { orders } = await this.userModel
        .findOne({ $or: [{ phone }, { email }] })
        .select('orders');

      if (!orders) {
        return new NotFoundException(USER_NOT_FOUND_ERROR);
      }

      return orders;
    } catch (error) {
      console.log('error:', error);
    }
  }

  async createOrUpdateUser(
    name: string,
    phone: string,
    email: string,
    address: string,
    order: CreateOrderDto[],
  ): Promise<User> {
    try {
      const user = await this.userModel.findOne({
        $or: [{ phone }, { email }],
      });

      if (!user) {
        const date = Date.now();
        return await this.userModel.create({
          name,
          phone,
          email,
          address,
          orders: [{ date, order }],
          firstOrder: date,
          lastOrder: date,
        });
      } else {
        {
          const date = Date.now();
          return await this.userModel.findOneAndUpdate(
            { $or: [{ phone }, { email }] },
            { $push: { orders: { date, order } }, lastOrder: date },
            { new: true },
          );
        }
      }
    } catch (error) {
      console.log('error:', error);
    }
  }
}
