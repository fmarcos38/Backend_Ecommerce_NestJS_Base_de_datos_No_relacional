import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

    async findAll(){
        const orders = await this.orderModel.find().populate('customer', 'name').populate('products', 'name');
        if(orders[0] == null) return 'Orders not found';
        return orders;
    }

    async findOne(id: string){
        const order = await this.orderModel.findById(id).exec();
        if(order == null) return 'Order not found';
        return order;
    }

    async create(data: CreateOrderDto){
        const createdOrder = new this.orderModel(data);
        createdOrder.save()
        return {
            message: 'Order creado',
            createdOrder,
        };
    }

    async update(id: string, changes: UpdateOrderDto){
        const order = await this.orderModel
            .findByIdAndUpdate(id, {$set: changes}, {new: true})
            .exec();
        if(order == null) return 'Order not found';
        return {
            message: 'Order actualizado',
            order,
        };
    }

    async remove(id: string){
        const order = await this.orderModel.findByIdAndDelete(id).exec();
        if(order == null) return 'Order not found';
        return {
            message: 'Order eliminado',
            order,
        };
    }

    //metodo para eliminar un producto de una orden
    async removeProduct(id: string, productId: string){
        //busco la orden
        const order = await this.orderModel.findById(id).exec();
        //busco el producto a eliminar
        order.products.pull(productId); //pull elimina el elemento del array(es un metodo de mongoose)
        await order.save();
        return {
            message: 'Product eliminado',
            order,
        };
    }

    //metodo para agregar un producto a una orden
    async addProduct(id: string, productsIds: string[]){ //productsIds es un array de ids de productos
        //busco la orden
        const order = await this.orderModel.findById(id).exec();
        if(order == null) return 'Order not found';
        //agrego los productos a la orden
        productsIds.forEach(productId => {
            order.products.push(productId);
        });
        order.save();
        return {
            message: 'Product agregado',
            order,
        };
    }

}
