import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminService } from 'src/admin/admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TopicSubscriptionDto } from 'src/admin/dto/topic-subscription.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly admin: AdminService) {}

  async create(user: CreateUserDto) {
    return this.prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
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

  subscribeToTopic(data: TopicSubscriptionDto) {
    // organizationId should be extracted from API key
    // For this demo, user will send it in the request params
    const topic = `${data.organizationId}_${data.topic}`;
    const updatedData: TopicSubscriptionDto = { ...data, topic };
    this.admin.subscribeToTopic(updatedData);
  }

  unsubscribeFromTopic(data: TopicSubscriptionDto) {
    const topic = `${data.organizationId}_${data.topic}`;
    const updatedData: TopicSubscriptionDto = { ...data, topic };
    this.admin.unsubscribeFromTopic(updatedData);
  }
}
