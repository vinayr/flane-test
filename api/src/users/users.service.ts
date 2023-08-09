import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: user.email } });
    if (exists) {
      throw new ConflictException('User already exists');
    }

    return this.prisma.user.create({ data: user });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, user: UpdateUserDto) {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new NotFoundException();
    }

    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    return this.prisma.user.delete({ where: { id } });
  }
}
