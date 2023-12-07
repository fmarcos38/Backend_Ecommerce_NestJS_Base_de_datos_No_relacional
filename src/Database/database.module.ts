import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import config from 'src/config';
import { MongoClientOptions } from 'mongodb';

@Global()
@Module({
    providers: [
        //conexion a la DB sin variables de entorno
        /* {
            provide: 'MONGO',
            useFactory: async () => {
                const client = new MongoClient('mongodb://root:root@localhost:27017/?authMechanism=DEFAULT');
                await client.connect();
                return client.db('platzi-store');
            },
        }, */
        //conexion a la DB con variables de entorno
        {
            provide: 'MONGO',

            // ...

            useFactory: async (configService: ConfigType<typeof config>) => {
                const { dbName, user, password, port, host, connection } = configService.mongo;
                const client = new MongoClient(
                    `mongodb://${user}:root@localhost:27017/?authMechanism=DEFAULT`, 
                    { 
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    } as MongoClientOptions // Add this type assertion
                );
                await client.connect();
                return client.db(dbName);
            },
            inject: [
                config.KEY// 👈 inyectamos dependencias, son las variables de entorno tipadas
            ],
        },
    ],
    exports: ['MONGO'],//exportamos la conexion a la DB
})
export class DatabaseModule {}

/*

import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongoClient, MongoClientOptions } from 'mongodb';
import config from './config';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, port, host, connection } = configService.mongo;
        const client = new MongoClient(
          `mongodb://${user}:${password}@${host}:${port}/${dbName}?authMechanism=DEFAULT`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          } as MongoClientOptions,
        );
        await client.connect();
        return client.db(dbName);
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}

*/