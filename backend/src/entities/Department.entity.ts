import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Employee } from "./Employee.entity";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name!: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees!: Employee[];
}
