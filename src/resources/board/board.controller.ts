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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { TaskService } from '../task/task.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.boardService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  addNewBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.addNewBoard(createBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':boardId')
  async getBoardById(
    @Res() response: Response,
    @Param('boardId') boardId: string,
  ) {
    const board = await this.boardService.getBoardById(boardId);

    if (board) {
      return response.status(HttpStatus.OK).send(board);
    }

    return response.status(HttpStatus.NOT_FOUND).send('not found');
  }

  @UseGuards(JwtAuthGuard)
  @Put(':boardId')
  updateBoard(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.updateBoard(boardId, updateBoardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':boardId')
  async deleteBoardById(@Param('boardId') boardId: string) {
    await this.boardService.deleteBoardById(boardId);

    this.taskService.deleteTasksForParticularBoardId(boardId);
  }
}
