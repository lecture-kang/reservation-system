import { Test, TestingModule } from '@nestjs/testing';
import { SeatsService } from './seats.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SeatReservation } from './entities/seat_reservation.entity';
import { CreateSeatReservationDto } from './dto/create-seat-reservation.dto';

describe('SeatsService', () => {
  let service: SeatsService;
  let seatReservationRepository: Repository<SeatReservation>;

  // Mock 데이터 및 Repository의 기본 함수 모의 처리
  const mockSeatReservationRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeatsService,
        {
          provide: getRepositoryToken(SeatReservation), // Repository 모의 처리
          useValue: mockSeatReservationRepository,
        },
      ],
    }).compile();

    service = module.get<SeatsService>(SeatsService);
    seatReservationRepository = module.get<Repository<SeatReservation>>(
      getRepositoryToken(SeatReservation),
    );
  });

  // 서비스 정의 테스트
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // reserveSeat 메서드 테스트
  describe('reserveSeat', () => {
    it('should create and save a new seat reservation', async () => {
      const dto: CreateSeatReservationDto = {
        userId: 'user123',
        seatId: 'seat456',
        reservationTime: '2024-10-17T10:00:00Z',
      };

      // 새로운 좌석 예약 생성 및 저장 로직 모의 처리
      mockSeatReservationRepository.create.mockReturnValue({
        userId: dto.userId,
        seatId: dto.seatId,
        reservationTime: new Date(dto.reservationTime),
      });
      mockSeatReservationRepository.save.mockResolvedValue({
        userId: dto.userId,
        seatId: dto.seatId,
        reservationTime: new Date(dto.reservationTime),
      });

      const result = await service.reserveSeat(dto);

      // 예상대로 호출되었는지 확인
      expect(seatReservationRepository.create).toHaveBeenCalledWith({
        userId: dto.userId,
        seatId: dto.seatId,
        reservationTime: new Date(dto.reservationTime),
      });

      // 저장 로직이 호출되었는지 확인
      expect(seatReservationRepository.save).toHaveBeenCalledWith({
        userId: dto.userId,
        seatId: dto.seatId,
        reservationTime: new Date(dto.reservationTime),
      });

      // 저장된 좌석 예약 정보가 맞는지 확인
      expect(result).toEqual({
        userId: dto.userId,
        seatId: dto.seatId,
        reservationTime: new Date(dto.reservationTime),
      });
    });
  });

  // getReservationByUser 메서드 테스트
  describe('getReservationByUser', () => {
    it('should return the seat reservation if the user has one', async () => {
      const userId = 'user123';

      // 유저의 좌석 예약이 있다고 가정한 상황 모의 처리
      mockSeatReservationRepository.findOne.mockResolvedValue({
        userId,
        seatId: 'seat456',
        reservationTime: new Date('2024-10-17T10:00:00Z'),
      });

      const result = await service.getReservationByUser(userId);

      // 예상대로 호출되었는지 확인
      expect(seatReservationRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });

      // 좌석 예약 정보가 올바르게 반환되는지 확인
      expect(result).toEqual({
        userId,
        seatId: 'seat456',
        reservationTime: new Date('2024-10-17T10:00:00Z'),
      });
    });

    it('should return null if the user has no reservation', async () => {
      const userId = 'invalidUser';

      // 유저의 좌석 예약이 없다고 가정한 상황 모의 처리
      mockSeatReservationRepository.findOne.mockResolvedValue(null);

      const result = await service.getReservationByUser(userId);

      // 예상대로 호출되었는지 확인
      expect(seatReservationRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });

      // null 반환 여부 확인
      expect(result).toBeNull();
    });
  });
});
