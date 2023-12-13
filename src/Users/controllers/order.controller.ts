import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { AddProductToOrderDto, CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    findAll() {
        return this.orderService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orderService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateOrderDto) {
        return this.orderService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
        return this.orderService.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.orderService.remove(id);
    }

    //elim un prod de una orden
    //Endpoint: http://localhost:3000/order/657a0857f7aa8446de402736/products/6578ae12b90e9d194a269833
    @Delete(':id/products/:productId')
    removeProduct(@Param('id') id: string, @Param('productId') productId: string) {
        return this.orderService.removeProduct(id, productId);
    }

    //agregar un prod a una orden
    //Endpoint: http://localhost:3000/order/657a0857f7aa8446de402736/products
    @Put(':id/products')
    addProduct(@Param('id') id: string, @Body() payload: AddProductToOrderDto) {
        return this.orderService.addProduct(id, payload.productsIds);
    }

}
