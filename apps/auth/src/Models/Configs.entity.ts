import { Table, Column, Model, PrimaryKey, AllowNull, AutoIncrement } from 'sequelize-typescript';
import { TCONFIG } from '@app/common/Types/TConfig';
import { DataTypes } from 'sequelize';

@Table
export class Configs extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  type: TCONFIG;

  @Column(DataTypes.TEXT)
  value: string;
}
