import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { PRODUCT_NOT_FOUND_ERROR } from './product.constants';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto) {
    return await this.productModel.create(dto);
  }

  async getGoods(page: number, limit: number, shop: string, search?: string) {
    const goods = search
      ? await this.productModel
          .find({
            shop,
            title: { $regex: `${search}`, $options: '/i' },
          })
          .sort({ title: 1 })
          .limit(limit)
          .skip((page - 1) * limit)
      : await this.productModel
          .find({ shop })
          .sort({ title: 1 })
          .limit(limit)
          .skip((page - 1) * limit);

    const totalCount = search
      ? await this.productModel.count({
          shop,
          title: { $regex: `${search}`, $options: '/i' },
        })
      : await this.productModel.count({ shop });

    return { goods, totalCount };
  }

  async delete(id: string) {
    const deletedId = await this.productModel.findByIdAndDelete(id);

    if (!deletedId) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return deletedId;
  }

  async updateById(id: string, dto: CreateProductDto): Promise<Product> {
    const updatedTest = await this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    if (!updatedTest) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
    }

    return updatedTest;
  }

  async findAllUniqueShops() {
    return this.productModel.distinct('shop').exec();
  }
}
