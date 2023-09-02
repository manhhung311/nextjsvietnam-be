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

@Table
export class Profile extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  fullName: string;

  @Column
  address: string;

  @Column
  avatar: string;

  @Column
  phoneNumber: string;

  @AllowNull(false)
  @Column
  gender: string;

  @ForeignKey(() => Users)
  @Column(DataType.UUID)
  @Column
  idUser: string;

  @BelongsTo(() => Users)
  user: Users;
}
