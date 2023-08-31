import { Injectable } from '@nestjs/common';

@Injectable()
export class GatewaysService {
  getHello(): string {
    return 'Hello World!';
  }
}
