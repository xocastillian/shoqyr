import { Module, ValidationPipe } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { ReviewModule } from './review/review.module';
import { SportTypeModule } from './sport-type/sport-type.module';
import { APP_PIPE } from '@nestjs/core';
import { ShippingInfoModule } from './shipping-info/shipping-info.module';

@Module({
  imports: [
    ProductModule,
    CategoryModule,
    UserModule,
    AddressModule,
    OrderModule,
    OrderItemModule,
    CartModule,
    CartItemModule,
    ReviewModule,
    SportTypeModule,
    ShippingInfoModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
