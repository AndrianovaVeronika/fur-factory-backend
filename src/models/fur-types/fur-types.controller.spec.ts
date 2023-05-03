import { Test, TestingModule } from '@nestjs/testing';
import { FurTypesController } from './fur-types.controller';

describe('FurTypesController', () => {
  let controller: FurTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FurTypesController],
    }).compile();

    controller = module.get<FurTypesController>(FurTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
