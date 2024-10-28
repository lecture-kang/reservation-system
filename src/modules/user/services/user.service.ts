import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private usersRepository: UsersRepository) {}

  // 1. 사용자 생성
  async createUser(userData: Partial<User>): Promise<User> {
    return await this.usersRepository.createUser(userData);
  }

  // 2. ID로 사용자 조회
  async getUserById(id: number): Promise<User | null> {
    return await this.usersRepository.findUserById(id);
  }

  // 3. 모든 사용자 조회
  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAllUsers();
  }

  // 4. 사용자 업데이트
  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    return await this.usersRepository.updateUser(id, updateData);
  }

  // 5. 사용자 삭제
  async deleteUser(id: number): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
