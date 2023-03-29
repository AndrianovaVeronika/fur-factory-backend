import {NestFactory} from '@nestjs/core';
import {ProductTypesModule} from "./product-types/product-types.module";

async function bootstrap() {
    const app = await NestFactory.create(ProductTypesModule);
    await app.listen(3000);
}

bootstrap();
