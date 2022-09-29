import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// // Grid
// {
//   uuid,
//   createdAt,
//   updatedAt,
//   userUuid
// }

// {
//   uuid,
//   x,
//   y,
//   h,
//   w,
//   data?
// }
