import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../entities/category.entity';
import { Model } from 'mongoose';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

    async findAll() {
        const categories = await this.categoryModel.find().exec();
        if (!categories) return 'No se encontraron categorias';
        return categories; 
    }

    async findOne(id: string) {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) return 'No se encontro la categoria';
        return category;
    }

    async create(data: CreateCategoryDto) {
        const newCategory = new this.categoryModel(data);
        const category = await newCategory.save();
        return {
            message: 'Categoria creada',
            category
        }
    }

    async update(id: string, changes: UpdateCategoryDto) {
        const category = await this.categoryModel
            .findByIdAndUpdate(id, { $set: changes }, { new: true })
            .exec();
        if (!category) return 'No se encontro la categoria';
        return category;
    }

    async remove(id: string) {
        return await this.categoryModel.findByIdAndDelete(id).exec();
    }
}
