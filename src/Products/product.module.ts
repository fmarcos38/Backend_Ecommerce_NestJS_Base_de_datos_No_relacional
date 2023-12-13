import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';

@Module({
    imports: [
        //declaro los modelos que voy a usar
        MongooseModule.forFeature([
            {
                name: Product.name, //nombre de la entidad
                schema: ProductSchema, //esquema de la entidad
            },
            {
                name: 'Category',
                schema: ProductSchema,
            },
            {
                name: 'Brand',
                schema: ProductSchema,
            }
        ])
    ],
    providers: [ProductService, CategoryService, BrandService],
    controllers: [ProductController, CategoryController, BrandController]
})
export class ProductsModule {}
