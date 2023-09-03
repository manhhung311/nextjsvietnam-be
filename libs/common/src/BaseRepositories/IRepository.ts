export interface IRepository {
  findById(id: number | string);
  getAll(attributes?: string[]): Promise<any[]>;
  deleteById(id: number | string);
  save(type);
  update(any);
}
