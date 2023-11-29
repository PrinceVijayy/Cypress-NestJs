import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeOnboard } from './employee-Onboard.entity';

@Injectable()
export class EmployeeOnboardService {
  constructor(
    @InjectRepository(EmployeeOnboard)
    private employeeOnboardRepository: Repository<EmployeeOnboard>,
  ) {}

  async findAll(): Promise<EmployeeOnboard[]> {
    return this.employeeOnboardRepository.find();
  }

  async findOne(id: number): Promise<EmployeeOnboard> {
    return this.employeeOnboardRepository.findOne({ where: { id } });
  }

  async create(
    employeeOnboard: Partial<EmployeeOnboard>,
  ): Promise<EmployeeOnboard> {
    const newemployeeOnboard =
      this.employeeOnboardRepository.create(employeeOnboard);
    return this.employeeOnboardRepository.save(newemployeeOnboard);
  }
  async delete(id: number): Promise<void> {
    await this.employeeOnboardRepository.delete(id);
  }
}
