import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  AutoIncrement,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
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

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  userId?: string;

  @AllowNull(true)
  @Column(DataTypes.TEXT)
  name?: string;

  @HasMany(() => Stars)
  stars: Stars[];

  @HasMany(() => Answers)
  answers: Answers[];

  @ForeignKey(() => Categorys)
  @Column
  categoryId: number;

  @BelongsTo(() => Categorys)
  category: Categorys;
}
