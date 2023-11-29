import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Delete,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { EmployeeOnboard } from './employee-onboard.entity';
import { EmployeeOnboardService } from './employee-onboard.service';

@Controller('employeeOnboard')
export class EmployeeOnboardController {
  constructor(
    private readonly employeeOnboardService: EmployeeOnboardService,
  ) {}

  //get all employee
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${file.originalname}`);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File, @Body() employee?: any) {
    let inputEmployee = employee;
    inputEmployee = JSON.parse(inputEmployee.employee);
    let emp = new EmployeeOnboard();

    emp.employeeName = inputEmployee.employeeName;
    emp.certificationDoc = file.originalname;
    return this.employeeOnboardService.create(emp);
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      filename,
    );
    const fileExists = fs.existsSync(filePath);

    if (!fileExists) {
      res.status(404).send('File not found');
      return;
    }

    const fileStream = fs.createReadStream(filePath);

    // Set the appropriate headers for streaming
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

    // Pipe the file stream to the response object
    fileStream.pipe(res);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    //handle error if employee does not exist
    const employee = await this.employeeOnboardService.findOne(id);
    if (!employee) {
      throw new NotFoundException('employee does not exist!');
    }
    return this.employeeOnboardService.delete(id);
  }
}
