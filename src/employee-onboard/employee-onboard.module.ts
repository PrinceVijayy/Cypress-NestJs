import { Module } from '@nestjs/common';
import { EmployeeOnboardService } from './employee-onboard.service';
import { EmployeeOnboardController } from './employee-onboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeOnboard } from './employee-Onboard.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EmployeeOnboard])],
  controllers: [EmployeeOnboardController],
  providers: [EmployeeOnboardService],
})
export class EmployeeOnboardModule {}
