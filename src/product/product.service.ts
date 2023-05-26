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

  async getGoods(page: string, limit: string, shop: string, search?: string) {
    const numPage = Number(page);
    const numLimit = Number(limit);
    const regexShop = new RegExp(shop, 'i');
    const regexSearch = search ? new RegExp(search, 'i') : null;

    const goods = regexSearch
      ? await this.productModel
          .find({ shop: regexShop, title: regexSearch })
          .sort({ title: 1 })
          .limit(numLimit)
          .skip((numPage - 1) * numLimit)
      : await this.productModel
          .find({ shop: regexShop })
          .sort({ title: 1 })
          .limit(numLimit)
          .skip((numPage - 1) * numLimit);

    const totalCount = regexSearch
      ? await this.productModel.count({ shop: regexShop, title: regexSearch })
      : await this.productModel.count({ shop: regexShop });

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
