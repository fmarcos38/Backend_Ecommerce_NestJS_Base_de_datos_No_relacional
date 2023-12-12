import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

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

    @Post()
    create(@Body() payload: CreateProductDto) {        
        return this.productService.create(payload);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
        return this.productService.update(id, payload);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.productService.remove(id);
    }
}
