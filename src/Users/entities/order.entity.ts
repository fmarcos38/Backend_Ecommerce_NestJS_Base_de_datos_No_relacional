import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Customer } from './customer.entity';
import { Product } from 'src/Products/entities/product.entity';

@Schema()
export class Order extends Document {
    @Prop({ type: Date })
    date: Date;

    //relacion 1:1 con customer referenciada
    @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
    customer: Customer | Types.ObjectId;

    //relacion N:M embebida con products
    @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
    products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);