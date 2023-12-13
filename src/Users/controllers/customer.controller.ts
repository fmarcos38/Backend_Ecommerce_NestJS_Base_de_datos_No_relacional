import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto } from '../dtos/customer.dto';

@Controller('customer')
export class CustomerController {
    constructor( private readonly customerService: CustomerService ) {}

    @Get()
    async findAll() {
        return this.customerService.findAll();
    }

    @Get(':id') 
    async findOne(@Param('id') id: string) {
        return this.customerService.findOne(id);
    }

    @Post()
    async create(@Body() data: CreateCustomerDto) {
        return this.customerService.create(data);
    }

    @Post(':id')
    async update(@Param('id') id: string, @Body() changes: CreateCustomerDto) {
        return this.customerService.update(id, changes);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.customerService.remove(id);
    }
}
