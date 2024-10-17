import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('queue_tickets')
export class QueueTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  serviceId: string;

  @Column()
  ticketNumber: number;

  @Column()
  currentQueuePosition: number;

  @Column()
  estimatedWaitTime: number;

  @CreateDateColumn()
  createdAt: Date;
}
