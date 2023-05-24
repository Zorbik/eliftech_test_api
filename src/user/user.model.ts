import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: [true, 'Name is required'] })
  name: string;

  @Prop({ required: [true, 'Phone is required'], unique: true })
  phone: string;

  @Prop({ required: [true, 'Email is required'], unique: true })
  email: string;

  @Prop()
  firstOrder: Date;

  @Prop()
  lastOrder: Date;

  @Prop()
  orders: CreateOrderDto[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
