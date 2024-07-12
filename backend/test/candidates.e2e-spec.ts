import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { candidatesMock } from './mocks/candidatesMock';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { Candidate } from '../src/candidates/entities/candidate.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let candidateRepository: Repository<Candidate>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    candidateRepository = moduleFixture.get<Repository<Candidate>>(
      getRepositoryToken(Candidate),
    );
  });

  afterEach(async () => {
    await candidateRepository.query('DELETE FROM candidate;');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get a single candidate', async () => {
    const response = await request(app.getHttpServer())
      .post('/candidates')
      .send({
        ...candidatesMock,
        email: faker.internet.email(),
      });
    const result = await request(app.getHttpServer()).get(
      `/candidates/${response.body.id}`,
    );
    expect(result.status).toBe(HttpStatus.OK);
  });

  it('should get a get all candidate', async () => {
    const result = await request(app.getHttpServer()).get(`/candidates/`);
    expect(result.status).toBe(HttpStatus.OK);
  });

  it('should get a update candidate', async () => {
    const response = await request(app.getHttpServer())
      .post('/candidates')
      .send({
        ...candidatesMock,
        email: faker.internet.email(),
      });
    const result = await request(app.getHttpServer())
      .patch(`/candidates/${response.body.id}`)
      .send({
        comment: 'updatedComment',
      });

    expect(result.status).toBe(HttpStatus.OK);
    expect(result.body.comment).toEqual('updatedComment');
  });
});
