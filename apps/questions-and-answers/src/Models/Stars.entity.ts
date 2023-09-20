import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Questions } from './Questions.entity';

@Table
export class Stars extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  data: string;

  @AllowNull(true)
  @Column(DataTypes.INTEGER)
  star: number;

  @ForeignKey(() => Questions)
  questionId: number;

  @BelongsTo(() => Questions)
  question: Questions;
}
