import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';
import { Users } from './Users.entity';
import { MetaData } from './MetaData.entity';

@Table
export class Tokens extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  refreshToken: string;

  @AllowNull(false)
  @Column
  open: boolean;

  @ForeignKey(() => Users)
  @Column(DataType.UUID)
  @Column
  idUser: string;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => MetaData)
  @Column
  idMetaData: number;

  @BelongsTo(() => MetaData)
  metaData: MetaData;
}
