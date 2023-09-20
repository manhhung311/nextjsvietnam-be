import { Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategorysService } from '../Services/Categorys.service';

@Controller('')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Post()
  @MessagePattern({ cmd: 'create.category' })
  async create(data: string) {
    console.log(data);
    return this.categorysService.create(data);
  }

  @Get()
  @MessagePattern({ cmd: 'get.category' })
  async get() {
    return this.categorysService.getAll();
  }
}
