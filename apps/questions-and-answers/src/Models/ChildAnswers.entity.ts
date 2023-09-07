import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

@Table
export class ChildAnswers extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  data: string;

  @Column(DataTypes.TEXT)
  userId: string;
}
