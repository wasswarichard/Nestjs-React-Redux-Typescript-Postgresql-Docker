import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesService } from './candidates.service';
import { Candidate } from './entities/candidate.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CandidatesService', () => {
  let service: CandidatesService;
  const mockCandidateEntity = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    findOne: jest.fn().mockImplementation((dto) => dto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesService,
        {
          provide: getRepositoryToken(Candidate),
          useValue: mockCandidateEntity,
        },
      ],
    }).compile();

    service = module.get<CandidatesService>(CandidatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
