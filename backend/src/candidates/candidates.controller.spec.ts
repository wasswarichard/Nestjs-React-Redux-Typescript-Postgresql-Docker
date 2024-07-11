import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  const mockCandidateService = {
    create: jest.fn((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [CandidatesService],
    })
      .overrideProvider(CandidatesService)
      .useValue(mockCandidateService)
      .compile();

    controller = module.get<CandidatesController>(CandidatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a candidate', async () => {
    expect(
      await controller.create({
        comment: 'This is the edit comment',
        email: 'wasswarichard55@gmail.com',
        firstname: 'Wasswa',
        github: 'https://github.com/wasswarichard',
        lastname: 'Richard',
        linkedin: 'https://www.linkedin.com/in/wasswarichard/',
        phoneNumber: '0778808233',
        timeInterval: '55',
      }),
    ).toEqual({
      id: expect.any(Number),
      comment: 'This is the edit comment',
      email: 'wasswarichard55@gmail.com',
      firstname: 'Wasswa',
      github: 'https://github.com/wasswarichard',
      lastname: 'Richard',
      linkedin: 'https://www.linkedin.com/in/wasswarichard/',
      phoneNumber: '0778808233',
      timeInterval: '55',
    });
  });
});
