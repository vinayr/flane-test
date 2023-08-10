import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminService } from 'src/admin/admin.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TopicDto } from 'src/admin/dto/topic.dto';
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

  private async buildSubscriptionData(id: string, topic: string) {
    const user = await this.findOne(id);
    const data: TopicSubscriptionDto = {
      deviceToken: user.deviceToken,
      topic: `${user.organizationId}_${topic}`,
    };
    return data;
  }

  async subscribeToTopic(id: string, body: TopicDto) {
    const data = await this.buildSubscriptionData(id, body.topic);
    this.admin.subscribeToTopic(data);
  }

  async unsubscribeFromTopic(id: string, body: TopicDto) {
    const data = await this.buildSubscriptionData(id, body.topic);
    this.admin.unsubscribeFromTopic(data);
  }
}
