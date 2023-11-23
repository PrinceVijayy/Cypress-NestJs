import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('add/:num1/:num2')
  getHello(@Param('num1') num1: string, @Param('num2') num2: string): string {
    
    const result = this.appService.add(+num1, +num2);
    return `The sum of ${num1} and ${num2} is ${result}`;
  }
}

