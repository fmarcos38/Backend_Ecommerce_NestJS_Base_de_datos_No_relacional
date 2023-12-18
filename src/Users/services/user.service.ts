import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, FilterUsersDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(params?: FilterUsersDto) { 
        const users = await this.userModel.find().exec();
        if(users[0] == null){return 'No se encontraron usuarios';}

        if(params){
            const { limit, offset } = params;
            return {
                message: 'Productos encontrados',
                productstotal: users.length,
                products: await this.userModel.find().skip(offset * limit).limit(limit),
            };
        }
        return users;
    }

    async findOne(id: string) {
        const user = await this.userModel.findById({ _id: new ObjectId(id) });
        if(!user) return 'No se encontro el usuario';

        return user;
    }

    //busca por email
    async findOneByEmail(email: string) {
        const user = await this.userModel.findOne({ email: email }); //find retorna un array y findOne retorna un objeto
        if(!user) { throw new UnauthorizedException('No se encontro el usuario'); }

        return user;
    }

    /* async create(data: CreateUserDto) {
        const users = await this.userModel.find();
        const buscoUserByEmail = users.find((user) => user.email === data.email);
        if(buscoUserByEmail) return 'El user ya esta registrado';
        const createdUser = new this.userModel(data);
        createdUser.save()
        return {
            message: 'Usuario creado',
            createdUser,
        };
    } */

    //create user con pass encriptado
    async create(data: CreateUserDto) {
        const users = await this.userModel.find();
        const buscoUserByEmail = users.find((user) => user.email === data.email);
        if(buscoUserByEmail) return 'El user ya esta registrado';

        //crear user
        const createdUser = new this.userModel(data);
        //encriptar password
        const hashedPassword = await bcrypt.hash(data.password, 10);
        createdUser.password = hashedPassword;
        //guardar user 
        const newUser = createdUser.save();
        if(!newUser) return 'No se pudo crear el usuario';
        //const { password, ...resp } = (await newUser).toJSON();
        
        return {
            message: 'Usuario creado',
            newUser, //no me muestra esto en el postman
        };
    }
    async update(id: string, changes: CreateUserDto) {
        const user = await this.userModel.findById({ _id: new ObjectId(id) });
        if(!user) return 'No se encontro el usuario';
        user.set(changes);
        user.save();
        return {
            message: 'Usuario actualizado',
            user,
        };
    }

    async remove(id: string) {
        const user = await this.userModel.findByIdAndDelete({ _id: new ObjectId(id) });
        if(!user) return 'No se encontro el usuario';

        return {
            message: 'Usuario eliminado',
            user,
        };
    }
}
