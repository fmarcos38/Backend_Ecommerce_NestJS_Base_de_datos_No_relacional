import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";
import { Order } from "./order.entity";

@Schema()
export class Customer extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;
    
    //relacion 1:N embebida con orders
    @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Order' }] })
    orders: Order[];

}
export const CustomerSchema = SchemaFactory.createForClass(Customer);