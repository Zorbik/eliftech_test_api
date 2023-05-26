import { CreateOrderDto } from './create-order.dto';

export interface UserDto {
  name: string;
  phone: string;
  email: string;
  address: string;
  order: CreateOrderDto[];
}
