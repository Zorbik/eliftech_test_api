import { CreateOrderDto } from './create-order.dto';

export interface OrdersDto {
  date: Date;
  order: CreateOrderDto[];
}
