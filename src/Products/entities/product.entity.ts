import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ type: Number, index: true }) //con index especifico que es un campo que se va a buscar mucho
    price: number;

    @Prop({ type: Number })
    stock: number;

    @Prop()
    image: string;

    //para la relacion embebida 1:1
    @Prop(
        raw({
            name: { type: String }
        })
    )
    category: Record<string, any>; //Record<string, any> es un objeto que puede tener cualquier tipo de dato

    //para la relacion 1:1 referenciada con Brand
    /* @Prop({
        type: Types.ObjectId,
        ref: Brand.name,
    })
    brand: Brand | Types.ObjectId; */ //para el id de la marca puede ser de ttipo objeto o de tipo ID de mongo

    //para la relacion 1:1 embebida con Brand REFERENCIADA
    @Prop({ type: Types.ObjectId, ref: Brand.name })
    brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
//indexar campos para mejorar la busqueda de forma compuesta
ProductSchema.index({ price: 1, stock: -1 }); // 1 ascendente, -1 descendente