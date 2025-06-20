import { AppDataSource } from "../configs/database";
import { Employee } from "../entities/Employee.entity";
import { Repository } from "typeorm";

const employeeRepository = () => AppDataSource.getRepository(Employee);

export async function getAll(): Promise<Employee[]> {
  return await employeeRepository().find({
    relations: ["department", "role"],
  });
}

export async function getById(id: number): Promise<Employee | null> {
  return await employeeRepository().findOneBy({ id });
}

export async function create(data: Omit<Employee, "id">): Promise<Employee> {
  const employee = employeeRepository().create(data);
  return await employeeRepository().save(employee);
}

export async function update(id: number, data: Partial<Employee>): Promise<Employee | null> {
  const repo = employeeRepository();
  const employee = await repo.findOneBy({ id });
  if (!employee) return null;
  repo.merge(employee, data);
  return await repo.save(employee);
}

export async function deleteEmployee(id: number): Promise<boolean> {
  const result = await employeeRepository().delete(id);
  return result.affected !== 0;
}
