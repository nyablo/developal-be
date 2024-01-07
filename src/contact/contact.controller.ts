import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { Contact } from 'src/database/contact.entity';
import { CreateContactDto } from './create-contact.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Promise<Contact[]> {
    return this.contactService.findAll(req.user.phone_number);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() req,
    @Body() createContactDto: CreateContactDto,
  ): Promise<Contact> {
    return this.contactService.create({
      ...createContactDto,
      ownerPhoneNumber: req.user.phone_number,
    });
  }
}
