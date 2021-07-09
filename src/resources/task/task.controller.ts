import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('boards')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:boardId/tasks')
  getAll(@Param('boardId') boardId: string) {
    return this.taskService.getAll(boardId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:boardId/tasks')
  createTask(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.createTask(boardId, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:boardId/tasks/:taskId')
  async getTaskById(
    @Res() response: Response,
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    const task = await this.taskService.getTaskById(boardId, taskId);

    if (task) {
      return response.status(HttpStatus.OK).send(task);
    }

    return response.status(HttpStatus.NOT_FOUND).send('not found');
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:boardId/tasks/:taskId')
  updateTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(boardId, taskId, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:boardId/tasks/:taskId')
  deleteTaskById(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.taskService.deleteTaskById(boardId, taskId);
  }
}
