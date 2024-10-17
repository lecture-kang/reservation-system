import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueuesModule } from './queues/queues.module';
import { SeatsModule } from './seats/seats.module';
import { SeatReservation } from './seats/entities/seat_reservation.entity';
import { QueueTicket } from './queues/entities/queue_ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // TODO : env 분리
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0316',
      database: 'sys',
      entities: [SeatReservation, QueueTicket],
      synchronize: true,
    }),
    QueuesModule,
    SeatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
