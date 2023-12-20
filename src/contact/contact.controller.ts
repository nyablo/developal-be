import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from 'src/database/contact.entity';
import { CreateContactDto } from './create-contact.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() createContactDto: CreateContactDto,
  ): Promise<Contact> {
    return this.contactService.create(createContactDto, req.user);
  }
}
