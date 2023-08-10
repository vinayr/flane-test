import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminService } from 'src/admin/admin.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { TopicNotificationDto } from 'src/admin/dto/topic-notification.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService, private readonly adminService: AdminService) {}

  async create(organization: CreateOrganizationDto) {
    const exists = await this.prisma.organization.findUnique({ where: { name: organization.name } });
    if (exists) {
      throw new ConflictException('Organization already exists');
    }

    return this.prisma.organization.create({ data: organization });
  }

  findAll() {
    return this.prisma.organization.findMany();
  }

  findOne(id: string) {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async update(id: string, organization: UpdateOrganizationDto) {
    const existingOrg = await this.findOne(id);
    if (!existingOrg) {
      throw new NotFoundException();
    }

    return this.prisma.organization.update({
      where: { id },
      data: organization,
    });
  }

  async remove(id: string) {
    const org = await this.findOne(id);
    if (!org) {
      throw new NotFoundException();
    }

    return this.prisma.organization.delete({ where: { id } });
  }

  notify(id: string, data: TopicNotificationDto) {
    const topic = `${id}_${data.topic}`;
    const updatedData: TopicNotificationDto = { ...data, topic };
    this.adminService.sendMessageToTopic(updatedData);
  }
}
