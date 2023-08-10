import { IsString, IsNotEmpty } from 'class-validator';

export class TopicDto {
  @IsString()
  @IsNotEmpty()
  topic: string;
}
