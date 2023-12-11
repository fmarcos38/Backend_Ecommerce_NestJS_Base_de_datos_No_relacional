import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}
  
  //metodo para obtener las tareas de la DB
  async getTasks() {
    return {
      message: 'Tasks',
      tasks: await this.database.collection('tasks').find({}).toArray(),
    }
  }
  
}
