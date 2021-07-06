import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

@Entity({ name: 'users' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, default: 'USER' })
  name: string;

  @Column('varchar', { length: 255, default: 'user', unique: true })
  @Column('varchar', { length: 255, default: 'user' })
  login: string;

  @Column()
  password: string;
}
