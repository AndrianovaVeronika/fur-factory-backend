import { Test, TestingModule } from '@nestjs/testing';
import { GenderCategoriesController } from './gender-categories.controller';

describe('GenderCategoriesController', () => {
  let controller: GenderCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderCategoriesController],
    }).compile();

    controller = module.get<GenderCategoriesController>(GenderCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
