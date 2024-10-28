import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  // 1. 사용자 생성
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.create(userData); // 엔티티 인스턴스 생성
    return await this.save(user); // 데이터베이스에 저장
  }

  // 2. ID로 사용자 조회
  async findUserById(id: number): Promise<User | null> {
    return await this.findOne({ where: { id } }); // ID 조건으로 조회
  }

  // 3. 모든 사용자 조회
  async findAllUsers(): Promise<User[]> {
    return await this.find(); // 모든 사용자 조회
  }

  // 4. 사용자 업데이트
  async updateUser(id: number, updateData: Partial<User>): Promise<User> {
    await this.update(id, updateData); // 사용자 업데이트
    return this.findUserById(id); // 업데이트된 사용자 조회 후 반환
  }

  // 5. 사용자 삭제
  async deleteUser(id: number): Promise<void> {
    await this.delete(id); // 사용자 삭제
  }
}
