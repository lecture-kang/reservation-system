import { IsString, IsISO8601 } from 'class-validator';

export class CreateSeatReservationDto {
  @IsString()
  userId: string;

  @IsString()
  seatId: string;

  @IsISO8601()
  reservationTime: string;
}
