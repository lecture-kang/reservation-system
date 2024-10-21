import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueuesModule } from './queues/queues.module';
import { SeatsModule } from './seats/seats.module';
import { SeatReservation } from './seats/entities/seat_reservation.entity';
import { QueueTicket } from './queues/entities/queue_ticket.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // .env 파일을 읽기 위한 설정
      envFilePath: '.env',
    }),
    DatabaseModule,
    QueuesModule,
    SeatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
