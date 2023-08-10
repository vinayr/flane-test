import { IsString, IsNotEmpty } from 'class-validator';

export class TopicNotificationDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  topic: string;
}
