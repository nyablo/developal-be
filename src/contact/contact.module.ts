import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { contactProviders } from './contact.providers';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactController],
  providers: [...contactProviders, ContactService],
})
export class ContactModule {}
