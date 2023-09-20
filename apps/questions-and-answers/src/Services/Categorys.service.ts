import { HttpStatus, Injectable } from '@nestjs/common';
import { CategorysRepository } from '../Repositories/CategorysRepository';
import { Categorys } from '../Models/Categorys.entity';
@Injectable()
export class CategorysService {
  private categoryRepository: CategorysRepository;
  constructor() {
    this.categoryRepository = new CategorysRepository();
  }

  public async create(data: string) {
    const categorys = new Categorys();
    categorys.data = data;
    const category = await this.categoryRepository.save(categorys);
    return { statusCode: HttpStatus.CREATED, message: 'OK', data: category, errors: null };
  }

  public async getAll() {
    return {
      statusCode: HttpStatus.CREATED,
      message: 'OK',
      data: await this.categoryRepository.getAll(),
      errors: null,
    };
  }
}
