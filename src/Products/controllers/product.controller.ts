import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async findAll() {
        return this.productService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }
}
