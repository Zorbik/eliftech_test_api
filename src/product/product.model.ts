import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: [true, 'Shop is required'] })
  shop: string;

  @Prop({ required: [true, 'Title is required'] })
  title: string;

  @Prop()
  picture: string;

  @Prop({ required: [true, 'Price is required'] })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
