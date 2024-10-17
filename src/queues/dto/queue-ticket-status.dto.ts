import { IsNumber, IsISO8601 } from 'class-validator';

export class QueueTicketStatusDto {
  @IsNumber()
  ticketNumber: number;

  @IsNumber()
  currentQueuePosition: number;

  @IsNumber()
  estimatedWaitTime: number;
}
