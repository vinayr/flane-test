import { IsString, IsNotEmpty } from 'class-validator';

export class TopicSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @IsString()
  @IsNotEmpty()
  deviceToken: string;

  @IsString()
  @IsNotEmpty()
  topic: string;
}
