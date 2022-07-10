import { AccountModel } from '@domain/models/account-model';
import { AuthenticationParams } from '@domain/usecases/autentication';
import { faker } from '@faker-js/faker';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.alphaNumeric(48),
});
