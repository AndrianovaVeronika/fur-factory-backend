import { Test, TestingModule } from '@nestjs/testing';
import { GenderCategoriesService } from './gender-categories.service';

describe('GenderCategoriesService', () => {
  let service: GenderCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenderCategoriesService],
    }).compile();

    service = module.get<GenderCategoriesService>(GenderCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
