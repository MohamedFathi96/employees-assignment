import { Department } from "../entities/Department.entity";
import { Employee } from "../entities/Employee.entity";
import { DataSource } from "typeorm";
import { Role } from "../entities/Role.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // TODO: Set to false in production
  logging: false,
  entities: [Employee, Role, Department],
  migrations: [],
  subscribers: [],
});
