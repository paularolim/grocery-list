import { AuthenticationParams } from '@domain/usecases/autentication';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
