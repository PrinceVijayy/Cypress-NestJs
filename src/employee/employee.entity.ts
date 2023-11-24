import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employee: string;

  @Column()
  email: string;
}
