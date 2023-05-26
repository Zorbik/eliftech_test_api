import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { OrdersDto } from './dto/orders.dto';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: [true, 'Name is required'] })
  name: string;

  @Prop({ required: [true, 'Phone is required'], unique: true })
  phone: string;

  @Prop({ required: [true, 'Email is required'], unique: true })
  email: string;

  @Prop({ required: [true, 'Address is required'] })
  address: string;

  @Prop()
  firstOrder: Date;

  @Prop()
  lastOrder: Date;

  @Prop()
  orders: OrdersDto[];
}

const UserSchema = SchemaFactory.createForClass(User);

export { UserSchema };
