import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategorysService } from '../Services/Categorys.service';
import { CreatedCategoryDTO } from '@app/common/questions-and-answers/DTO/createCategory.dto';

@Controller('')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Post()
  @MessagePattern({ cmd: 'create.category' })
  async create(data: CreatedCategoryDTO) {
    return this.categorysService.create(data.name);
  }

  @Get()
  @MessagePattern({ cmd: 'get.category' })
  async get() {
    return this.categorysService.getAll();
  }
}
