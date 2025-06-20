import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Department } from "./Department.entity";
import { Role } from "./Role.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar")
  name!: string;

  @Column("varchar")
  email!: string;

  @ManyToOne(() => Role)
  role!: Role;

  @ManyToOne(() => Department)
  department!: Department;
}
