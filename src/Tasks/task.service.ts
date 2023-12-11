import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class TaskService {
    constructor(
        @Inject('MONGO') private database: Db //inyectamos la conexion a la DB --> desde el modulo DatabaseModule
    ) {}

    async findAll() {
        const tasks = await this.database.collection('tasks').find({}).toArray();
        return {
            message: 'Tareas encontradas',
            tasks,
        };
    }
}
