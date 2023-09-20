import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Questions } from './Questions.entity';

@Table
export class Categorys extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  data: string;

  @HasMany(() => Questions)
  questions: Questions[];
}
