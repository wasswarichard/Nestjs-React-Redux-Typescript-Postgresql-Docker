import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { candidatesMock } from './mocks/candidatesMock';
import { faker } from '@faker-js/faker';

describe('AppController (e2e)', () => {
  const url = 'http://localhost:3000';

  it('should create a candidate', async () => {
    const response = await request(url)
      .post('/api/candidates')
      .send({
        ...candidatesMock,
      });
    expect(response.status).toBe(HttpStatus.CREATED);
  });

  it('should get a single candidate', async () => {
    const response = await request(url)
      .post('/api/candidates')
      .send({
        ...candidatesMock,
        email: faker.internet.email(),
      });
    const result = await request(url).get(
      `/api/candidates/${response.body.id}`,
    );
    expect(result.status).toBe(HttpStatus.OK);
  });

  it('should get a get all candidate', async () => {
    const result = await request(url).get(`/api/candidates/`);
    expect(result.status).toBe(HttpStatus.OK);
  });
});
