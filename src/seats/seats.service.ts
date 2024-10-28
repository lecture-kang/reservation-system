import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeatReservation } from './entities/seat_reservation.entity';
import { CreateSeatReservationDto } from './dto/create-seat-reservation.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(SeatReservation)
    private seatReservationRepository: Repository<SeatReservation>,
  ) {}

  async reserveSeat(
    createSeatReservationDto: CreateSeatReservationDto,
  ): Promise<SeatReservation> {
    const { userId, seatId, reservationTime } = createSeatReservationDto;

    const reservation = this.seatReservationRepository.create({
      userId,
      seatId,
      reservationTime: new Date(reservationTime),
    });

    return this.seatReservationRepository.save(reservation);
  }

  async getReservationByUser(userId: string): Promise<SeatReservation | null> {
    return this.seatReservationRepository.findOne({ where: { userId } });
  }
}
