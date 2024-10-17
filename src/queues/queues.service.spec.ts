import { Test, TestingModule } from '@nestjs/testing';
import { QueuesService } from './queues.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { QueueTicket } from './entities/queue_ticket.entity';
import { CreateQueueTicketDto } from './dto/create-queue-ticket.dto';

describe('QueuesService', () => {
  let service: QueuesService;
  let queueTicketRepository: Repository<QueueTicket>;

  // Mock 데이터 및 Repository의 기본 함수 모의 처리
  const mockQueueTicketRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueuesService,
        {
          provide: getRepositoryToken(QueueTicket), // Repository 모의 처리
          useValue: mockQueueTicketRepository,
        },
      ],
    }).compile();

    service = module.get<QueuesService>(QueuesService);
    queueTicketRepository = module.get<Repository<QueueTicket>>(
      getRepositoryToken(QueueTicket),
    );
  });

  // 서비스 정의 테스트
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // issueTicket 메서드 테스트
  describe('issueTicket', () => {
    it('should create and save a new queue ticket', async () => {
      const dto: CreateQueueTicketDto = {
        userId: 'user123',
        serviceId: 'service456',
      };

      // 마지막 티켓이 없다고 가정한 상황 모의 처리
      mockQueueTicketRepository.findOne.mockResolvedValueOnce(null);

      // 새로운 티켓 생성 및 저장 로직 모의 처리
      mockQueueTicketRepository.create.mockReturnValue({
        userId: dto.userId,
        serviceId: dto.serviceId,
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });
      mockQueueTicketRepository.save.mockResolvedValue({
        userId: dto.userId,
        serviceId: dto.serviceId,
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });

      const result = await service.issueTicket(dto);

      // 예상대로 호출되었는지 확인
      expect(queueTicketRepository.findOne).toHaveBeenCalledWith({
        where: { serviceId: dto.serviceId },
        order: { ticketNumber: 'DESC' },
      });

      // 저장 로직이 호출되었는지 확인
      expect(queueTicketRepository.create).toHaveBeenCalledWith({
        userId: dto.userId,
        serviceId: dto.serviceId,
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });

      // 저장된 티켓 정보가 맞는지 확인
      expect(result).toEqual({
        userId: dto.userId,
        serviceId: dto.serviceId,
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });
    });
  });

  // getQueueStatus 메서드 테스트
  describe('getQueueStatus', () => {
    it('should return the queue status if the user has a ticket', async () => {
      const userId = 'user123';

      // 유저의 대기 티켓이 있다고 가정한 상황 모의 처리
      mockQueueTicketRepository.findOne.mockResolvedValue({
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });

      const result = await service.getQueueStatus(userId);

      // 예상대로 호출되었는지 확인
      expect(queueTicketRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });

      // 대기 티켓 상태가 올바르게 반환되는지 확인
      expect(result).toEqual({
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });
    });

    it('should return null if the user has no ticket', async () => {
      const userId = 'invalidUser';

      // 유저의 대기 티켓이 없다고 가정한 상황 모의 처리
      mockQueueTicketRepository.findOne.mockResolvedValue(null);

      const result = await service.getQueueStatus(userId);

      // 예상대로 호출되었는지 확인
      expect(queueTicketRepository.findOne).toHaveBeenCalledWith({
        where: { userId },
      });

      // null 반환 여부 확인
      expect(result).toBeNull();
    });
  });
});
