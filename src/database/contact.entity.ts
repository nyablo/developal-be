import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  message: string;

  @Column('text')
  imageUrl: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
