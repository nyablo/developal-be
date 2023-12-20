import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AuthChallenge {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  phoneNumber: string;

  @Column('text')
  otp: string;

  @Column('bigint')
  expiresAtTimestamp: number;
}
