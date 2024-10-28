import { Test, TestingModule } from '@nestjs/testing';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';
import { CreateQueueTicketDto } from './dto/create-queue-ticket.dto';

describe('QueuesController', () => {
  let queuesController: QueuesController;
  let queuesService: QueuesService;

  // Mock QueuesService
  const mockQueuesService = {
    issueTicket: jest.fn((dto: CreateQueueTicketDto) => {
      return {
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      };
    }),
    getQueueStatus: jest.fn((userId: string) => {
      if (userId === 'validUser') {
        return {
          ticketNumber: 1,
          currentQueuePosition: 1,
          estimatedWaitTime: 10,
        };
      } else {
        return null;
      }
    }),
  };

  // Before each test setup
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueuesController],
      providers: [
        {
          provide: QueuesService, // QueuesService에 대한 mock 주입
          useValue: mockQueuesService,
        },
      ],
    }).compile();

    queuesController = module.get<QueuesController>(QueuesController);
    queuesService = module.get<QueuesService>(QueuesService);
  });

  // 컨트롤러가 정의되었는지 테스트
  it('should be defined', () => {
    expect(queuesController).toBeDefined();
  });

  // issueTicket 메서드에 대한 테스트
  describe('issueTicket', () => {
    it('should call QueuesService.issueTicket and return the ticket details', async () => {
      const dto: CreateQueueTicketDto = {
        userId: 'user123',
        serviceId: 'service456',
      };

      const result = await queuesController.issueTicket(dto);

      // 서비스가 호출되었는지 확인
      expect(queuesService.issueTicket).toHaveBeenCalledWith(dto);

      // 반환 값이 예상대로 나오는지 확인
      expect(result).toEqual({
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });
    });
  });

  // checkStatus 메서드에 대한 테스트
  describe('checkStatus', () => {
    it('should return the queue status for a valid user', async () => {
      const userId = 'validUser';
      const result = await queuesController.checkStatus(userId);

      // 서비스가 호출되었는지 확인
      expect(queuesService.getQueueStatus).toHaveBeenCalledWith(userId);

      // 반환 값이 예상대로 나오는지 확인
      expect(result).toEqual({
        ticketNumber: 1,
        currentQueuePosition: 1,
        estimatedWaitTime: 10,
      });
    });

    it('should return a message when no queue is found for the given user', async () => {
      const userId = 'invalidUser';
      const result = await queuesController.checkStatus(userId);

      // 서비스가 호출되었는지 확인
      expect(queuesService.getQueueStatus).toHaveBeenCalledWith(userId);

      // 반환 값이 메시지로 나오는지 확인
      expect(result).toEqual({
        message: 'No queue found for the given user',
      });
    });
  });
});
