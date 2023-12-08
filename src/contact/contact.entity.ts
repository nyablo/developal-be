import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  ownerPhoneNumber: string;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  message: string;

  @Column('text')
  imageUrl: string;
}
