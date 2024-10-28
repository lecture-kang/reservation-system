import { Test, TestingModule } from '@nestjs/testing';
import { SeatsController } from './seats.controller';
import { SeatsService } from './seats.service';
import { CreateSeatReservationDto } from './dto/create-seat-reservation.dto';

// SeatsController에 대한 테스트 정의
describe('SeatsController', () => {
  let seatsController: SeatsController;
  let seatsService: SeatsService;

  // Mock SeatsService
  const mockSeatsService = {
    reserveSeat: jest.fn((dto: CreateSeatReservationDto) => {
      return {
        reservationId: 'abc123',
        seatId: dto.seatId,
        reservationTime: dto.reservationTime,
      };
    }),
  };

  // Before each test setup
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeatsController],
      providers: [
        {
          provide: SeatsService, // SeatsService에 대한 mock 주입
          useValue: mockSeatsService,
        },
      ],
    }).compile();

    seatsController = module.get<SeatsController>(SeatsController);
    seatsService = module.get<SeatsService>(SeatsService);
  });

  // 컨트롤러가 정의되었는지 테스트
  it('should be defined', () => {
    expect(seatsController).toBeDefined();
  });

  // 좌석 예약 엔드포인트에 대한 테스트
  describe('reserveSeat', () => {
    it('should call SeatsService.reserveSeat and return the reservation details', async () => {
      const dto: CreateSeatReservationDto = {
        userId: 'user123',
        seatId: 'seat456',
        reservationTime: '2024-10-17T10:00:00Z',
      };

      const result = await seatsController.reserveSeat(dto);

      // 서비스가 호출되었는지 확인
      expect(seatsService.reserveSeat).toHaveBeenCalledWith(dto);

      // 반환 값이 예상대로 나오는지 확인
      expect(result).toEqual({
        reservationId: 'abc123',
        seatId: dto.seatId,
        reservationTime: dto.reservationTime,
      });
    });
  });
});
