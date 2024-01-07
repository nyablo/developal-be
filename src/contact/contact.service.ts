import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from 'src/database/contact.entity';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.create(createContactDto);

    return this.contactRepository.save(contact);
  }

  async findAll(ownerPhoneNumber: string): Promise<Contact[]> {
    return this.contactRepository.find({ where: { ownerPhoneNumber } });
  }
}
