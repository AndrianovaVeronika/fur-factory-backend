import {Module} from '@nestjs/common'
import { ProductTypesController } from './product-types.controller';

@Module({
  controllers: [ProductTypesController]
})
export class ProductTypesModule {
}
