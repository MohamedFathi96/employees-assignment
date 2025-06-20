import * as employeeModel from "../models/employee.model";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const employees = await employeeModel.getAll();
  res.json(employees);
}

export async function getById(req: Request, res: Response) {
  const employee = await employeeModel.getById(Number(req.params.id));
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
}

export async function create(req: Request, res: Response) {
  const employee = await employeeModel.create(req.body);
  res.status(201).json(employee);
}

export async function update(req: Request, res: Response) {
  const employee = await employeeModel.update(Number(req.params.id), req.body);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
}

export async function remove(req: Request, res: Response) {
  const success = await employeeModel.deleteEmployee(Number(req.params.id));
  if (!success) return res.status(404).json({ message: "Employee not found" });
  res.status(204).send();
}
