import * as roleModel from "../models/role.model";
import { Request, Response } from "express";

export async function getAll(req: Request, res: Response) {
  const roles = await roleModel.getAll();
  res.json(roles);
}

export async function getById(req: Request, res: Response) {
  const role = await roleModel.getById(Number(req.params.id));
  if (!role) return res.status(404).json({ message: "Role not found" });
  res.json(role);
}

export async function create(req: Request, res: Response) {
  const role = await roleModel.create(req.body);
  res.status(201).json(role);
}

export async function update(req: Request, res: Response) {
  const role = await roleModel.update(Number(req.params.id), req.body);
  if (!role) return res.status(404).json({ message: "Role not found" });
  res.json(role);
}

export async function remove(req: Request, res: Response) {
  const success = await roleModel.deleteRole(Number(req.params.id));
  if (!success) return res.status(404).json({ message: "Role not found" });
  res.status(204).send();
}
