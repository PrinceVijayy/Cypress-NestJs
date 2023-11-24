import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { id } });
  }

  async create(employee: Partial<Employee>): Promise<Employee> {
    const newemployee = this.employeeRepository.create(employee);
    return this.employeeRepository.save(newemployee);
  }

  async update(id: number, employee: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, employee);
    return this.employeeRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
