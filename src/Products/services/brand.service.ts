import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Brand } from '../entities/brand.entity';
import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandyDto } from '../dtos/brand.dto';

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

    async findAll() {
        const brands = this.brandModel.find().exec();
        if(!brands) return "No hay marcas";
        return brands;
    }

    async findOne(id: string) {
        const brand = this.brandModel.findById(id).exec();
        if(!brand) return "No existe la marca";
        return brand;
    }

    async create(brand: CreateBrandDto) {
        const newBrand = new this.brandModel(brand);
        const newB = await newBrand.save();
        return {
            message: "Marca creada",
            newB
        }
    }

    async update(id: string, changes: UpdateBrandyDto) {
        const buscoBrand = await this.brandModel.findById(id).exec();
        if(!buscoBrand) return "No existe la marca";

        const brandModif = await this.brandModel.findOneAndUpdate({ _id: id }, { $set: changes }, { new: true }).exec(); // cons esta opc retorna el viejo Prod -> { upsert: true }
        return brandModif;
    }
    
    async remove(id: string) {
        const buscoBrand = await this.brandModel.findById(id).exec();
        if(!buscoBrand) return "No existe la marca";

        await this.brandModel.findByIdAndDelete(id);
        return {
            message: `Marca #${id} eliminada`,
            buscoBrand
        }
    }
}
