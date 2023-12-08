import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @Inject('CONTACT_REPOSITORY')
    private contactRepository: Repository<Contact>,
  ) {}

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find();
  }

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const phoneNumber = '0000000000'; // TODO get from auth context
    return this.contactRepository.create({
      ...createContactDto,
      ownerPhoneNumber: phoneNumber,
    });
  }
}
