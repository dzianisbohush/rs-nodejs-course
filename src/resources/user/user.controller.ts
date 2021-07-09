import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TaskService } from '../task/task.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();

    return users.map((user) => this.userService.toResponse(user));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);

    if (createdUser) {
      return this.userService.toResponse(createdUser);
    }

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);

    if (user) {
      return this.userService.toResponse(user);
    }

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUserData: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, updatedUserData);

    if (updatedUser) {
      return this.userService.toResponse(updatedUser);
    }

    return null;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    await this.userService.deleteUserById(id);

    this.taskService.unAssignUserId(id);
  }
}
