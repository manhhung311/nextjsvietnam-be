import { Model } from 'sequelize-typescript';
import { IRepository } from '../IRepository';

export abstract class BaseRepository<M extends Model> implements IRepository {
  constructor(protected model: typeof Model) {}

  public async findById(id: number): Promise<M> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.model.findByPk(id);
  }

  public async getAll(): Promise<M[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.model.findAll();
  }

  async deleteById(id: number) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const model = await this.model.findByPk(id);
    return model.destroy();
  }

  async delete(model: M) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return model.destroy();
  }

  save(type: M): Promise<M> {
    return type.save();
  }

  update(model: M) {
    return model.save();
  }
}
