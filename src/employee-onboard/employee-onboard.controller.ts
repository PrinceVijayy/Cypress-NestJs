import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeOnboardService } from './employee-onboard.service';
import { EmployeeOnboard } from './employee-onboard.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Employee } from 'src/employee/employee.entity';

@Controller('employeeOnboard')
export class EmployeeOnboardController {
  constructor(
    private readonly employeeOnboardService: EmployeeOnboardService,
  ) {}

  //get all employeeOnboard
  @Get()
  async findAll(): Promise<EmployeeOnboard[]> {
    return this.employeeOnboardService.findAll();
  }

  //get employeeOnboard by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EmployeeOnboard> {
    const employeeOnboard = await this.employeeOnboardService.findOne(id);
    if (!employeeOnboard) {
      throw new NotFoundException('employeeOnboard does not exist!');
    } else {
      return employeeOnboard;
    }
  }

  //create employeeOnboard
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() employeeName: string,
  ): Promise<EmployeeOnboard> {
    let emp = new EmployeeOnboard();
    emp.employeeName = employeeName;
    emp.certificationDoc = file.path + '/' + file.filename;
    return this.employeeOnboardService.create(emp);
  }

  //update employeeOnboard
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() employeeOnboard: EmployeeOnboard,
  ): Promise<any> {
    return this.employeeOnboardService.update(id, employeeOnboard);
  }

  //delete employeeOnboard
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if employeeOnboard does not exist
    const employeeOnboard = await this.employeeOnboardService.findOne(id);
    if (!employeeOnboard) {
      throw new NotFoundException('employeeOnboard does not exist!');
    }
    return this.employeeOnboardService.delete(id);
  }
}
