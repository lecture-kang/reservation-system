import { IsString, IsISO8601 } from 'class-validator';

export class CreateQueueTicketDto {
  @IsString()
  userId: string;

  @IsString()
  serviceId: string;
}
