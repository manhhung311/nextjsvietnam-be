export interface IRepository {
  findById(id: number);
  getAll(attributes?: string[]): Promise<any[]>;
  deleteById(id: number);
  save(type);
  update(any);
}
