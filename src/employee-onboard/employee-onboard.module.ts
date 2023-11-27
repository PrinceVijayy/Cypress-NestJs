import { Module } from '@nestjs/common';
import { EmployeeOnboardService } from './employee-onboard.service';
import { EmployeeOnboardController } from './employee-onboard.controller';

@Module({
  controllers: [EmployeeOnboardController],
  providers: [EmployeeOnboardService],
})
export class EmployeeOnboardModule {}
