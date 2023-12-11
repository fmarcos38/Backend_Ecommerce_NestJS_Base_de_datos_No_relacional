import { Global, Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from 'src/config';
import { MongoClientOptions } from 'mongodb';

@Global()
@Module({
    providers: [
        //conexion a la DB sin variables de entorno
        {
            provide: 'MONGO',
            useFactory: async () => {
                const client = new MongoClient('mongodb://root:root@localhost:27017/?authMechanism=DEFAULT');
                await client.connect();
                return client.db('platzi-store');
            },
        },
        //conexion a la DB con variables de entorno
        
    ],
    exports: ['MONGO'],//exportamos la conexion a la DB
})
export class DatabaseModule {}

