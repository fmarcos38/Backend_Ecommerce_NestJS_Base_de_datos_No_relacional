import { Body, Controller, Delete, Get, Param, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/user.dto';
import { ApikeyGuard } from 'src/auth/guards/apikey.guard';
import { Public } from 'src/auth/decorator/public.decorator';

@UseGuards(ApikeyGuard) //proteger todos los endpoints de este controlador
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    //@SetMetadata('isPublic', true) //DESproteger un endpoint en especifico
    @Public() //tambien puedo usar el decorador PERSONALIZADO @Public() para DESproteger un endpoint
    @Get('/saludo')
    getSaludo() {
        return 'Hola mundo';
    }
    
    //sin header = 123 no tengo acceso a los endpoints
    @Get()
    getUsers() {
        return this.userService.findAll();
    }

    @Get('/:id')
    async getUser(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Get('/email/:email')
    async getUserByEmail(@Param('email') email: string) {
        return this.userService.findOneByEmail(email);
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
