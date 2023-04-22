import { Module } from '@nestjs/common';
import { GenderCategoriesController } from './gender-categories.controller';
import { GenderCategoriesService } from './gender-categories.service';

@Module({
  controllers: [GenderCategoriesController],
  providers: [GenderCategoriesService]
})
export class GenderCategoriesModule {}
