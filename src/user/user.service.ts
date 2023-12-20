import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'src/database/user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create({
      ...createUserDto,
    });

    return this.userRepository.save(user);
  }

  async findOne(phoneNumber: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { phoneNumber },
      relations: { contacts: true },
    });
  }
}
