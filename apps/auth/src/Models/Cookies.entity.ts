import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { MetaData } from './MetaData.entity';

@Table
export class Cookies extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  cookie: string;

  @ForeignKey(() => MetaData)
  @Column
  idMetaData: number;

  @BelongsTo(() => MetaData)
  metaData: MetaData;
}
