import { CreateProductDto } from '../../product/dto/create-product.dto';

export interface CreateOrderDto extends CreateProductDto {
  quantity: number;
}
