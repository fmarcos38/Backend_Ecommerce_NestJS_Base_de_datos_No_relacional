import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    getCategories() {
        return this.categoryService.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }

    @Post()
    async create(@Body() data: CreateCategoryDto){
        return this.categoryService.create(data);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() changes: UpdateCategoryDto) {
        return this.categoryService.update(id, changes);
    }

    @Delete('/:id')
    remove(@Param('id') id: string) {
        return this.categoryService.remove(id);
    }
}
