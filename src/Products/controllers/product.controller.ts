import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/product.dto';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    @ApiOperation({ summary: 'List of products' }) // Swagger
    getProducts(@Query() params: FilterProductsDto) {
        return this.productService.findAll(params);
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Post()
    async create(@Body() body: CreateProductDto) {
        try {
        return await this.productService.create(body);
        } catch (error) {
        if (error.code === 11000) {
            throw new ConflictException('Task already exists');
        }
        throw error;
        }
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
