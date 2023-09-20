import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Questions } from './Questions.entity';
import { ChildAnswers } from './ChildAnswers.entity';

@Table
export class Answers extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  data: string;

  @Column(DataTypes.TEXT)
  userId: string;

  @ForeignKey(() => Questions)
  @Column
  questionId: number;

  @BelongsTo(() => Questions)
  question: Questions;

  @HasMany(() => ChildAnswers)
  childAnswers: ChildAnswers[];

  @AllowNull(true)
  @ForeignKey(() => ChildAnswers)
  @Column
  childAnswerId: number;

  @BelongsTo(() => ChildAnswers)
  childAnswer: ChildAnswers;
}
