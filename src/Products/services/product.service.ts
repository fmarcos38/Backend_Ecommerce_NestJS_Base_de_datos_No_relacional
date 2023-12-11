import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductService {

    constructor(
        @Inject('MONGO') private database: Db,
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async findAll() {
        const products = await this.database.collection('products').find({}).toArray();
        if(!products) throw new Error('No se encontraron productos');
        return {
            message: 'Productos encontrados',
            products,
        };
    }

    async findOne(id: string) {
        const product = await this.database.collection('products').findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }
}
