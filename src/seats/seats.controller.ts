import { Controller, Post, Body } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatReservationDto } from './dto/create-seat-reservation.dto';

@Controller('seat')
export class SeatsController {
  constructor(private readonly seatService: SeatsService) {}

  @Post('reservation')
  async reserveSeat(
    @Body() createSeatReservationDto: CreateSeatReservationDto,
  ) {
    return this.seatService.reserveSeat(createSeatReservationDto);
  }
}
