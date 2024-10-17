import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueueTicket } from './entities/queue_ticket.entity';
import { Repository } from 'typeorm';
import { CreateQueueTicketDto } from './dto/create-queue-ticket.dto';
import { QueueTicketStatusDto } from './dto/queue-ticket-status.dto';

@Injectable()
export class QueuesService {
  constructor(
    @InjectRepository(QueueTicket)
    private queueTicketRepository: Repository<QueueTicket>,
  ) {}

  async issueTicket(
    createQueueTicketDto: CreateQueueTicketDto,
  ): Promise<QueueTicket> {
    const { userId, serviceId } = createQueueTicketDto;

    // 대기번호 계산 (예: 마지막 대기번호 + 1)
    const lastTicket = await this.queueTicketRepository.findOne({
      where: { serviceId },
      order: { ticketNumber: 'DESC' },
    });

    const ticketNumber = lastTicket ? lastTicket.ticketNumber + 1 : 1;
    const estimatedWaitTime = ticketNumber * 10; // 대기 시간 계산 로직 (예시)

    const newTicket = this.queueTicketRepository.create({
      userId,
      serviceId,
      ticketNumber,
      currentQueuePosition: ticketNumber,
      estimatedWaitTime,
    });

    return this.queueTicketRepository.save(newTicket);
  }

  async getQueueStatus(userId: string): Promise<QueueTicketStatusDto | null> {
    const ticket = await this.queueTicketRepository.findOne({
      where: { userId },
    });

    if (!ticket) return null;

    return {
      ticketNumber: ticket.ticketNumber,
      currentQueuePosition: ticket.currentQueuePosition,
      estimatedWaitTime: ticket.estimatedWaitTime,
    };
  }

  create(createQueueDto: CreateQueueDto) {
    return 'This action adds a new queue';
  }

  findAll() {
    return `This action returns all queues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queue`;
  }

  update(id: number, updateQueueDto: UpdateQueueDto) {
    return `This action updates a #${id} queue`;
  }

  remove(id: number) {
    return `This action removes a #${id} queue`;
  }
}
