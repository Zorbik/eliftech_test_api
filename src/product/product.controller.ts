import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { IdValidationPipe } from '../pipes/id-validation.pipe';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get('goods/:shop')
  async get(
    @Param('shop') shop: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
    @Query('search') search: string,
  ) {
    return await this.productService.getGoods(page, limit, shop, search);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    return await this.productService.delete(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: CreateProductDto,
  ) {
    return await this.productService.updateById(id, dto);
  }

  @Get('unique/shops')
  async getUniqueShops() {
    return await this.productService.findAllUniqueShops();
  }
}
