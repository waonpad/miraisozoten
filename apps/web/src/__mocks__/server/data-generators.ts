/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { User } from 'database';

export const userGenerator = (overrides?: Partial<User>): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  emailVerified: faker.datatype.boolean(),
  image: faker.image.avatar(),
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});
