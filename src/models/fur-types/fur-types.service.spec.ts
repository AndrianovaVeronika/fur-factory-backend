import { Test, TestingModule } from '@nestjs/testing';
import { FurTypesService } from './fur-types.service';

describe('FurTypesService', () => {
  let service: FurTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FurTypesService],
    }).compile();

    service = module.get<FurTypesService>(FurTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
