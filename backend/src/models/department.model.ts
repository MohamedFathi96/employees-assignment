import { AppDataSource } from "../configs/database";
import { Department } from "../entities/Department.entity";

const departmentRepository = () => AppDataSource.getRepository(Department);

export async function getAll(): Promise<Department[]> {
  return await departmentRepository().find({ relations: ["employees"] });
}

export async function getById(id: number): Promise<Department | null> {
  return await departmentRepository().findOne({ where: { id }, relations: ["employees"] });
}

export async function create(data: Omit<Department, "id">): Promise<Department> {
  const department = departmentRepository().create(data);
  return await departmentRepository().save(department);
}

export async function update(id: number, data: Partial<Department>): Promise<Department | null> {
  const repo = departmentRepository();
  const department = await repo.findOneBy({ id });
  if (!department) return null;
  repo.merge(department, data);
  return await repo.save(department);
}

export async function deleteDepartment(id: number): Promise<boolean> {
  const result = await departmentRepository().delete(id);
  return result.affected !== 0;
}
