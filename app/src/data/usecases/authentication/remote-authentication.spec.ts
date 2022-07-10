import { HttpClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  test('Should call HTTPClient with correct URL', async () => {
    const url = 'any_url';
    const httpPostClientSpy = new HttpClientSpy();

    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();

    expect(httpPostClientSpy.url).toBe(url);
  });
});