import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //get all employee
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  //get employee by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee does not exist!');
    } else {
      return employee;
    }
  }

  //create employee
  @Post()
  async create(@Body() employee: Employee): Promise<Employee> {
    return this.employeeService.create(employee);
  }

  //update employee
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() employee: Employee,
  ): Promise<any> {
    return this.employeeService.update(id, employee);
  }

  //delete employee
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if employee does not exist
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee does not exist!');
    }
    return this.employeeService.delete(id);
  }
}
