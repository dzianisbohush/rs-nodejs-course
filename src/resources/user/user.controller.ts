import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { TaskService } from '../task/task.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  async getAllUsers() {
    const users = await this.userService.getAll();

    return users.map((user) => this.userService.toResponse(user));
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.userService.createUser(createUserDto);

    //@ts-ignore
    return this.userService.toResponse(createdUser);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);

    //@ts-ignore
    return this.userService.toResponse(user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedUserData: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(id, updatedUserData);

    //@ts-ignore
    return this.userService.toResponse(updatedUser);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    await this.userService.deleteUserById(id);

    this.taskService.unAssignUserId(id);
  }
}
