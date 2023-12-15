import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/user.dto';
import { ApikeyGuard } from 'src/auth/guards/apikey.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    //ejemplo de endpoint con implementacion de guard
    //lo voy a proteger con el guard que cree
    @UseGuards(ApikeyGuard)
    @Get('/saludo')
    getSaludo() {
        return 'Hola mundo';
    }

    @Get()
    getUsers() {
        return this.userService.findAll();
    }

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    async createUser(@Body() data: CreateUserDto) {
        return this.userService.create(data);
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() changes: CreateUserDto) {
        return this.userService.update(id, changes);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
