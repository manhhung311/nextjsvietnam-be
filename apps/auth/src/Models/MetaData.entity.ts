import { Table, Column, Model, PrimaryKey, AutoIncrement, HasMany, HasOne } from 'sequelize-typescript';
import { Tokens } from './Tokens.entity';
import { OldTokens } from './OldTokens.entity';
import { Cookies } from './Cookies.entity';

@Table
export class MetaData extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @HasMany(() => OldTokens)
  oldToken: OldTokens[];

  @HasMany(() => Tokens)
  token: Tokens[];

  @HasOne(() => Cookies)
  cookies: Cookies[];
}
