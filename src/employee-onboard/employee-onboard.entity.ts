import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class EmployeeOnboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeName: string;

  @Column()
  certificationDoc: string;
}
