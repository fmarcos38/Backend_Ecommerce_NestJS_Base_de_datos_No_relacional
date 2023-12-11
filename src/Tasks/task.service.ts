import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';
import { Db } from 'mongodb';

@Injectable()
export class TaskService {
    constructor(
        @Inject('MONGO') private database: Db
    ) {}

    async findAll() {
        const tasks = await this.database.collection('tasks').find({}).toArray();
        return {
            message: 'Tareas encontradas',
            tasks,
        };
    }
}
