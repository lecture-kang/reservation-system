import { Module } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { QueuesController } from './queues.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueTicket } from './entities/queue_ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueueTicket])],
  controllers: [QueuesController],
  providers: [QueuesService],
})
export class QueuesModule {}
