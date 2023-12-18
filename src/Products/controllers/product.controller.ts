import { Body, ConflictException, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/model/roles.model';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

//utilizo 2 guardianes
@UseGuards(AuthGuard('jwt'), RolesGuard) //'jwt' es el nombre de la estrategia, q le paso al guard para q sepa q estrategia usar
@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Roles(Role.ADMIN) //con esto le digo q solo los admin pueden crear productos
    @Get()
    @ApiOperation({ summary: 'List of products' }) // Swagger
    getProducts(@Query() params: FilterProductsDto) {
        return this.productService.findAll(params);
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Roles(Role.ADMIN) //con esto le digo q solo los admin pueden crear productos
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
