import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('users') // /users 경로로 엔드포인트 설정
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 1. 사용자 생성 엔드포인트
  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return await this.userService.createUser(userData);
  }

  // 2. ID로 사용자 조회 엔드포인트
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  // 3. 모든 사용자 조회 엔드포인트
  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  // 4. 사용자 업데이트 엔드포인트
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateData);
  }

  // 5. 사용자 삭제 엔드포인트
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
