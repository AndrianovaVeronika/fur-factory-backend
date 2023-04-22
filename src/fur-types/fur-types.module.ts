import { Module } from '@nestjs/common';
import { FurTypesController } from './fur-types.controller';
import { FurTypesService } from './fur-types.service';

@Module({
  controllers: [FurTypesController],
  providers: [FurTypesService]
})
export class FurTypesModule {}
