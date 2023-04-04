import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from "@nestjs/common";
import {ProductTypesModule} from "./product-types/product-types.module";

async function bootstrap() {
    const app = await NestFactory.create(ProductTypesModule);
    app.useGlobalPipes(
        new ValidationPipe()
    );
    await app.listen(3000);
}

bootstrap();
