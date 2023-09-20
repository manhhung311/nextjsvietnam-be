import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Answers } from './Answers.entity';

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

  @ForeignKey(() => Answers)
  @Column
  answerId: number;

  @BelongsTo(() => Answers)
  answer: Answers;

  @HasMany(() => Answers)
  answers: Answers[];
}
