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
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Response } from 'express';
import { TaskService } from '../task/task.service';

@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  getAll() {
    return this.boardService.getAll();
  }

  @Post()
  addNewBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.addNewBoard(createBoardDto);
  }

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

  @Put(':boardId')
  updateBoard(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.updateBoard(boardId, updateBoardDto);
  }

  @Delete(':boardId')
  async deleteBoardById(@Param('boardId') boardId: string) {
    await this.boardService.deleteBoardById(boardId);

    this.taskService.deleteTasksForParticularBoardId(boardId);
  }
}
