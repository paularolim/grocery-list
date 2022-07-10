import { HttpPostClient } from '@data/protocols/http/http-post-client';
import { HttpStatusCode } from '@data/protocols/http/http-response';
import { InvalidCredentialsError, UnexpectedError } from '@domain/errors';
import { AccountModel } from '@domain/models';
import { AuthenticationParams } from '@domain/usecases';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body;

      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();

      default:
        throw new UnexpectedError();
    }
  }
}
