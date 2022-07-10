import axios from 'axios';
import { faker } from '@faker-js/faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => new AxiosHttpClient();

describe('AxiosHttpClient', () => {
  test('Should call Axios with correct URL and verb', async () => {
    const url = faker.internet.url();
    const sut = makeSut();
    await sut.post({ url, body: {} });

    expect(mockedAxios.post).toBeCalledWith(url);
  });
});
