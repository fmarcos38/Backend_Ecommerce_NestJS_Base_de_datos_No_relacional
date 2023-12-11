import { Controller, Get, Inject } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema'; // Add this import

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async findAll() {
        return this.taskService.findAll();
    }
}
