import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Db } from 'mongodb';
import { Model } from 'mongoose';
import { Product } from '../entities/product.entity';
import { ObjectId } from 'mongodb';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {

    constructor(
        //@Inject('MONGO') private database: Db,
        @InjectModel(Product.name) private productModel: Model<Product>
    ) { }

    async findAll(params?: FilterProductsDto) {
        const products = await this.productModel.find().populate('brand', 'name');
        //sino hay prods
        if(!products) throw new Error('No se encontraron productos');        
        
        if(params){
            const { limit, offset } = params;
            const { minPrice, maxPrice } = params;
            //filtro por rango de precios
            if(minPrice && maxPrice){
                const products = await this.productModel.find({ price: { $gte: minPrice, $lte: maxPrice } }).populate('brand');
                return {
                    message: 'Productos encontrados',
                    productstotal: products.length,
                    products,
                };
            }
            //filtro por precio minimo hacia arriba
            if(minPrice){
                const products = await this.productModel.find({ price: { $gte: minPrice } }).populate('brand');
                return {
                    message: 'Productos encontrados',
                    productstotal: products.length,
                    products,
                };
            }
            //filtro por precio maximo hacia abajo
            if(maxPrice){
                const products = await this.productModel.find({ price: { $lte: maxPrice } }).populate('brand');
                return {
                    message: 'Productos encontrados',
                    productstotal: products.length,
                    products,
                };
            }
            return {
                message: 'Productos encontrados',
                productstotal: products.length,
                products: await this.productModel.find().skip(offset * limit).limit(limit).populate('brand', 'name'),
            };
        }

        return {
            message: 'Productos encontrados',
            productstotal: products.length,
            products,
        };
    }

    async findOne(id: string) {
        const product = await this.productModel.findById({ _id: new ObjectId(id) }).populate('brand', 'name');
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        return product;
    }

    async create(data: CreateProductDto) {
        const respuesta = await this.findAll(); //console.log(prods);
        const buscoProd = respuesta.products.find(prod => prod.name === data.name);
        if(buscoProd) return 'El producto ya existe';

        const newProduct = new this.productModel(data);
        await newProduct.save();
        return {
            message: 'Producto creado',
            product: newProduct,
        };
    }

    async update(id: string, changes: UpdateProductDto) {
        const product = await this.findOne(id); console.log(product);
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        const newProd = await this.productModel.findOneAndUpdate({ _id: id }, { $set: changes }, { new: true }).exec(); // cons esta opc retorna el viejo Prod -> { upsert: true }
        return newProd;
    }

    async remove(id: string) {
        const product = await this.findOne(id);
        if (!product) {
            throw new NotFoundException(`Product #${id} not found`);
        }
        await this.productModel.findByIdAndDelete({ _id: new ObjectId(id) });
        return {
            message: `Product #${id} deleted`,
            product
        }
    }

}
