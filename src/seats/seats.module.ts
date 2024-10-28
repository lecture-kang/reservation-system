import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatReservation } from './entities/seat_reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SeatReservation])],

  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
