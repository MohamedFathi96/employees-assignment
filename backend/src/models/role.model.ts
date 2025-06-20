import { AppDataSource } from "../configs/database";
import { Role } from "../entities/Role.entity";

const roleRepository = () => AppDataSource.getRepository(Role);

export async function getAll(): Promise<Role[]> {
  return await roleRepository().find({ relations: ["employees"] });
}

export async function getById(id: number): Promise<Role | null> {
  return await roleRepository().findOne({ where: { id }, relations: ["employees"] });
}

export async function create(data: Omit<Role, "id">): Promise<Role> {
  const role = roleRepository().create(data);
  return await roleRepository().save(role);
}

export async function update(id: number, data: Partial<Role>): Promise<Role | null> {
  const repo = roleRepository();
  const role = await repo.findOneBy({ id });
  if (!role) return null;
  repo.merge(role, data);
  return await repo.save(role);
}

export async function deleteRole(id: number): Promise<boolean> {
  const result = await roleRepository().delete(id);
  return result.affected !== 0;
}
