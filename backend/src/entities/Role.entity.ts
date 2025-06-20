import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Employee } from "./Employee.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name!: string;

  @OneToMany(() => Employee, (employee) => employee.role)
  employees!: Employee[];
}
