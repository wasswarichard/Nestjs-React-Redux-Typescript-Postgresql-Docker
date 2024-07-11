import { faker } from '@faker-js/faker';

export const candidatesMock = {
  comment: 'comment',
  email: faker.internet.email(),
  firstname: faker.person.firstName(),
  lastname: faker.person.lastName(),
  linkedin: faker.internet.url().replaceAll(' ', ''),
  github: faker.internet.url().replaceAll(' ', ''),
  phoneNumber: '0778000000',
  timeInterval: faker.person.firstName(),
};
