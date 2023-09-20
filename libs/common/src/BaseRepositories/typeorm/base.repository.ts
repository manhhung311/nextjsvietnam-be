/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeepPartial, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T> extends Repository<T> {
  public async findById(id: number | string): Promise<T> {
    //@ts-ignore
    return await this.findBy({ id });
  }

  public async getAll(): Promise<T[]> {
    // @ts-ignore
    return this.find();
  }

  async deleteById(id: number | string): Promise<DeleteResult> {
    //@ts-ignore
    return this.delete({ id });
  }

  async createModel(type: DeepPartial<T>): Promise<T> {
    return this.save(type);
  }

  async updateById(id: number | string, partialEntity: QueryDeepPartialEntity<T>): Promise<UpdateResult> {
    return this.update(id, partialEntity);
  }
}
