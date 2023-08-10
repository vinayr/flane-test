import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminModule } from 'src/admin/admin.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [PrismaModule, AdminModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
