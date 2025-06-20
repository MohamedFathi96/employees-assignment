import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.object({
    id: z.number().min(1, "Role ID is required"),
    name: z.string().min(1, "Role name is required"),
  }),
  department: z.object({
    id: z.number().min(1, "Department ID is required"),
    name: z.string().min(1, "Department name is required"),
  }),
});
