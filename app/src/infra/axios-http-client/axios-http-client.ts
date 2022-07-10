import { HttpPostParams } from '@data/protocols/http';
import axios from 'axios';

export class AxiosHttpClient {
  async post({ url }: HttpPostParams<any>): Promise<void> {
    await axios(url);
  }
}
