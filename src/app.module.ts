import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductTypesModule } from './product-types/product-types.module';

@Module({
  imports: [ProductTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
