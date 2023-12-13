import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { CreateBrandDto, UpdateBrandyDto } from '../dtos/brand.dto';

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Get('/:id')
    findOne(@Param('id') id: string) {
        return this.brandService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateBrandDto) {
        return this.brandService.create(payload);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() payload: UpdateBrandyDto) {
        return this.brandService.update(id, payload);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.brandService.remove(id);
    }
}
