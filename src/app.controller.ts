import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './resources/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {
    this.userService.createAdminUser();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
