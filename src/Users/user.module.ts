import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CustomerController } from './controllers/customer.controller';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';
import { CustomerService } from './services/customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './entities/customer.entity';
import { OrderSchema } from './entities/order.entity';
import { UserSchema } from './entities/user.entity';

@Module({
  imports: [
    //declaro los modelos que voy a usar
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
      {
        name: 'Customer',
        schema: CustomerSchema,
      },
    ]),
  ],
  controllers: [UserController, CustomerController, OrderController],
  providers: [OrderService, UserService, CustomerService],
  exports: [UserService] //exporto el servicio para poder usarlo en otros modulos
})
export class UserModule {}
