import {Module} from '@nestjs/common';
import {GenderCategoriesController} from './gender-categories.controller';
import {GenderCategoriesService} from './gender-categories.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {GenderCategory} from "./gender-category.entity";

@Module({
    imports: [TypeOrmModule.forFeature([GenderCategory])],
    controllers: [GenderCategoriesController],
    providers: [GenderCategoriesService]
})
export class GenderCategoriesModule {
}
