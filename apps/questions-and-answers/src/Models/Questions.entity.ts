import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement, HasOne, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Categorys } from './Categorys.entity';
import { Stars } from './Stars.entity';
import { Answers } from './Answers.entity';

@Table
export class Questions extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataTypes.TEXT)
  data: string;

  @Column(DataTypes.TEXT)
  userId: string;

  starsId: number[];

  categoryId: number;

  answersId: number[];

  @HasOne(() => Categorys)
  category: Categorys;

  @HasMany(() => Stars)
  start: Stars[];

  @HasMany(() => Answers)
  answers: Answers[];
}
