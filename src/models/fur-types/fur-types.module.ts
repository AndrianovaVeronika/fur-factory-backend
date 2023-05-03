import {Module} from '@nestjs/common';
import {FurTypesController} from './fur-types.controller';
import {FurTypesService} from './fur-types.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FurType} from "./fur-type.entity";

@Module({
    imports: [TypeOrmModule.forFeature([FurType])],
    controllers: [FurTypesController],
    providers: [FurTypesService]
})
export class FurTypesModule {
}
