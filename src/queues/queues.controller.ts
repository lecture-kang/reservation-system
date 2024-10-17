import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueuesService } from './queues.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { CreateQueueTicketDto } from './dto/create-queue-ticket.dto';

@Controller('queues')
export class QueuesController {
  constructor(private readonly queueService: QueuesService) {}

  // @Post()
  // create(@Body() createQueueDto: CreateQueueDto) {
  //   return this.queuesService.create(createQueueDto);
  // }

  @Post()
  async issueTicket(@Body() createQueueTicketDto: CreateQueueTicketDto) {
    return this.queueService.issueTicket(createQueueTicketDto);
  }

  @Get('status/:userId')
  async checkStatus(@Param('userId') userId: string) {
    const status = await this.queueService.getQueueStatus(userId);
    if (!status) {
      return { message: 'No queue found for the given user' };
    }
    return status;
  }
}
