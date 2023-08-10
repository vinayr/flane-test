import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TopicDto } from 'src/admin/dto/topic.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(':id/subscribe')
  subscribeToTopic(@Param('id') id: string, @Body() body: TopicDto, @Res() res: Response) {
    this.usersService.subscribeToTopic(id, body);
    res.status(HttpStatus.OK).send({ success: true });
  }

  @Post(':id/unsubscribe')
  unsubscribeFromTopic(@Param('id') id: string, @Body() body: TopicDto, @Res() res: Response) {
    this.usersService.unsubscribeFromTopic(id, body);
    res.status(HttpStatus.OK).send({ success: true });
  }
}
