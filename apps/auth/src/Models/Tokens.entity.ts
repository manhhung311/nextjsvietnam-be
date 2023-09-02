import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
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

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(2048))
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
