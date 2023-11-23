import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //activacion de LAS VALIDACIONES --> lo hago YO
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //con ESTO EVITO q se acepten parametros q NO estan declarados en mi dto
    //forbidNonWhitelisted: true, //con esta LE agrego un aviso(osea un msj) 
    transformOptions: {
      enableImplicitConversion: true, //con esto le digo q convierta los tipos de datos q vienen en el body o query a los tipos de datos q le indico en el dto
    },
  }));

  //voy a declarar el ClassSerializerInterceptor en el main.ts para que se aplique a toda la app
  //explicacion en el CAP-31 (es para serializar la info q se envia en las respuestas)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Platzi API')
    .setDescription('Documentación Platzi API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //acá le especifico q url va a ser 'docs'
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
