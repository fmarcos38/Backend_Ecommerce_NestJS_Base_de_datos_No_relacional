import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './Products/product.module';
import { UserModule } from './Users/user.module';
//import { MongoClient } from 'mongodb';
import { AuthModule } from './auth/auth.module';

//--conexion de prueba para la DB de mongoDB----------------------------------------
/* const uri = 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect(); // conectar a la base de datos
    const database = client.db('platzi-store'); // nombre de la base de datos
    const tasks = database.collection('tasks'); // nombre de la coleccion
    console.log('Tasks: ', await tasks.find({}).toArray());
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
run().catch(console.error); */
//---------------------------------------------------------------------------------


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017/?authMechanism=DEFAULT'), //sin var de entorno
    ProductsModule,
    UserModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}