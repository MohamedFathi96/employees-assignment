import * as departmentModel from "../models/department.model";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const departments = await departmentModel.getAll();
  res.json(departments);
}

export async function getById(req: Request, res: Response) {
  const department = await departmentModel.getById(Number(req.params.id));
  if (!department) return res.status(404).json({ message: "Department not found" });
  res.json(department);
}

export async function create(req: Request, res: Response) {
  const department = await departmentModel.create(req.body);
  res.status(201).json(department);
}

export async function update(req: Request, res: Response) {
  const department = await departmentModel.update(Number(req.params.id), req.body);
  if (!department) return res.status(404).json({ message: "Department not found" });
  res.json(department);
}

export async function remove(req: Request, res: Response) {
  const success = await departmentModel.deleteDepartment(Number(req.params.id));
  if (!success) return res.status(404).json({ message: "Department not found" });
  res.status(204).send();
}
