import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('seat_reservations')
export class SeatReservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  seatId: string;

  @Column()
  reservationTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
