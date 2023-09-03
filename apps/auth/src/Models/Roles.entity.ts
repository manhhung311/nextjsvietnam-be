import { Table, Column, Model, PrimaryKey, Unique, AllowNull, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Users } from './Users.entity';

@Table
export class Roles extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  data: string;

  @HasMany(() => Users)
  users: Users[];
}
