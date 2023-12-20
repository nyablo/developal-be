import { Contact } from 'src/database/contact.entity';
import { Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  phoneNumber: string;

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
