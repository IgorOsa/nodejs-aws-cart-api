import { Injectable } from '@nestjs/common';
import { User } from '../models';
import { UsersRepository } from '../repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findOne(name: string): Promise<User | undefined> {
    return this.usersRepository.findOneByName(name);
  }

  async createOne({ name, password }: Partial<User>): Promise<User> {
    return this.usersRepository.createOne({ name, password });
  }
}
