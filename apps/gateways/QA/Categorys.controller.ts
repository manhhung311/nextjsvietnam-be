import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IResponse } from '@app/common/IResponse';
import { CategorysResponse } from '@app/common/questions-and-answers/Responses/categorys-response';
import { CategoryCreateResponse } from '@app/common/questions-and-answers/Responses/categorys-create-response';
import { CreatedCategoryDTO } from '@app/common/questions-and-answers/DTO/createCategory.dto';

@Controller('Categorys')
export class CategorysController {
  constructor(@Inject('QA') private readonly qaClient: ClientProxy) {}

  @Post()
  async create(@Body() data: CreatedCategoryDTO): Promise<CategoryCreateResponse> {
    const request = this.qaClient.send({ cmd: 'create.category' }, data);
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.CREATED) {
      throw new HttpException(
        {
          statusCode: response.statusCode,
          data: response.data,
          message: response.message,
          errors: response.errors,
        },
        response.statusCode
      );
    }
    return response;
  }

  @Get()
  async getAll(): Promise<CategorysResponse> {
    const request = this.qaClient.send({ cmd: 'get.category' }, '');
    const response: IResponse = await firstValueFrom(request);
    if (response.statusCode != HttpStatus.OK) {
      throw new HttpException(
        {
          statusCode: response.statusCode,
          data: response.data,
          message: response.message,
          errors: response.errors,
        },
        response.statusCode
      );
    }
    return response;
  }
}
