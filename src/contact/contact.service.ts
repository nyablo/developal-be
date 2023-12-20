import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from 'src/database/contact.entity';
import { CreateContactDto } from './create-contact.dto';
import { User } from 'src/database/user.entity';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(
    createContactDto: CreateContactDto,
    user: User,
  ): Promise<Contact> {
    const contact = await this.contactRepository.create(createContactDto);

    contact.user = user;

    return this.contactRepository.save(contact);
  }
}
