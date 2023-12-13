import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../entities/customer.entity';
import { Model } from 'mongoose';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerService {
    constructor(@InjectModel(Customer.name) private customerModel: Model<Customer>) {}

    async findAll(){
        const customers = await this.customerModel.find().exec();
        if(customers[0] == null) return 'Customers not found';
        
        return customers;
    }

    async findOne(id: string){
        const customer = await this.customerModel.findById(id).exec();
        if(customer == null) return 'Customer not found';
        
        return customer;
    }

    async create(data: CreateCustomerDto) {
        const users = await this.customerModel.find();
        const buscoUserByEmail = users.find((user) => user.email === data.email);
        if(buscoUserByEmail) return 'El customer ya esta registrado';
        const createdUser = new this.customerModel(data);
        createdUser.save()
        return {
            message: 'Customer creado',
            createdUser,
        };
    }

    async update(id: string, changes: UpdateCustomerDto){
        const customer = await this.customerModel.findById(id).exec();
        if(!customer) return 'Customer not found';
        customer.set(changes);
        return await customer.save();
    }

    async remove(id: string){
        const customer = await this.customerModel.findByIdAndDelete(id).exec();
        if(!customer) return 'Customer not found';
        return 'Customer deleted';
    }
}
