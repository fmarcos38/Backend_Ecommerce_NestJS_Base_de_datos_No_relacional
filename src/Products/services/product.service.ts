import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { ObjectId } from 'mongodb';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

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

    async create(data: CreateProductDto) {
        const newProduct = new this.productModel(data);
        await newProduct.save();
        return {
            message: 'Producto creado',
            product: newProduct,
        };
    }

    async update(id: string, changes: UpdateProductDto) {
        const product = await this.database.collection('products').findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        await this.productModel.updateOne({ _id: new ObjectId(id) }, { $set: changes }, { upsert: true });
        return product;
    }

    async remove(id: string) {
        const product = await this.database.collection('products').findOne({ _id: new ObjectId(id) });
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        await this.productModel.deleteOne({ _id: new ObjectId(id) });
        return product;
    }

}
