import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name, //nombre de la entidad
                schema: ProductSchema, //esquema de la entidad
            },
        ])
    ],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductsModule {}
