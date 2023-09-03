import {
  Table,
  Column,
  Model,
  PrimaryKey,
  Unique,
  AllowNull,
  Length,
  HasMany,
  HasOne,
  ForeignKey,
  BelongsTo,
  DataType,
  Default,
} from 'sequelize-typescript';
import { OldTokens } from './OldTokens.entity';
import { Profile } from './Profiles.entity';
import { Tokens } from './Tokens.entity';
import { Roles } from './Roles.entity';

@Table
export class Users extends Model {
  @PrimaryKey
  @Unique
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Unique
  @AllowNull(false)
  @Column
  userName: string;

  @Length({ min: 8 })
  @AllowNull(false)
  @Column
  password: string;

  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @AllowNull(false)
  @Column
  activated: boolean;

  @Column(DataType.TEXT)
  keyActivated: string;

  @Column
  keyForgetPassword: string;

  @Column
  open2FA: boolean;

  @Column
  key2FA: string;

  @HasOne(() => Profile)
  profile: Profile;

  @HasMany(() => Tokens)
  token: Tokens[];

  @HasMany(() => OldTokens)
  oldToken: OldTokens[];

  @AllowNull(true)
  @ForeignKey(() => Roles)
  @Column
  idRole: number;

  @BelongsTo(() => Roles)
  role: Roles;
}
