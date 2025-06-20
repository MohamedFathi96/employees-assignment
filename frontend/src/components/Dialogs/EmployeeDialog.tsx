"use client";
import { useForm } from "@tanstack/react-form";

import { Button } from "@/components/Ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Ui/dialog";
import { Input } from "@/components/Ui/input";
import { Label } from "@/components/Ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Ui/select";
import { Employee, EmployeeDialogProps } from "@/types/employee.type";
import { useRoles } from "@/hooks/useRoles";
import { useDepartments } from "@/hooks/useDepartments";
import { employeeSchema } from "@/schemas/employeeSchema";

export function EmployeeDialog({ employee, open, onOpenChange, onSave }: EmployeeDialogProps) {
  const { data: departments = [] } = useDepartments();
  const { data: roles = [] } = useRoles();

  const form = useForm({
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      role: employee?.role || roles[0],
      department: employee?.department || departments[0],
    },
    onSubmit: async ({ value }) => {
      const updatedEmployee: Employee = {
        ...employee,
        ...value,
        id: employee?.id ?? 0, // Ensure id is always a number
      };
      onSave(updatedEmployee);
    },
    validators: {
      onSubmit: employeeSchema,
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{employee ? "Edit Employee" : "Add Employee"}</DialogTitle>
          <DialogDescription>
            {employee ? "Update the employee's information." : "Fill in the details to add a new employee."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid gap-4 py-4">
            <form.Field name="name">
              {(field) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.name} className="text-right">
                    Name
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="col-span-3"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="col-span-4 text-sm text-red-500">
                      {field.state.meta.errors.map((error) => (
                        <div key={error?.message} className="text-red-500">
                          {error?.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="email">
              {(field) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.name} className="text-right">
                    Email
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="col-span-3"
                  />
                  {field.state.meta.errors.length > 0 && (
                    <div className="col-span-4 text-sm text-red-500">
                      {field.state.meta.errors.map((error) => (
                        <div key={error?.message} className="text-red-500">
                          {error?.message || "Invalid email address"}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="role">
              {(field) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.name} className="text-right">
                    Role
                  </Label>
                  <Select
                    value={field.state.value?.id?.toString() ?? ""}
                    onValueChange={(roleId) => {
                      const selectedRole = roles.find((role) => role.id === +roleId);
                      if (selectedRole) field.handleChange(selectedRole);
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.id.toString()}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <div className="col-span-4 text-sm text-red-500">
                      {field.state.meta.errors.map((error) => (
                        <div key={error?.message} className="text-red-500">
                          {error?.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="department">
              {(field) => (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor={field.name} className="text-right">
                    Department
                  </Label>
                  <Select
                    value={field.state.value?.id.toString() ?? ""}
                    onValueChange={(deptId) => {
                      const selectedDept = departments.find((dept) => dept.id === +deptId);
                      if (selectedDept) field.handleChange(selectedDept);
                    }}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id.toString()}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.errors.length > 0 && (
                    <div className="col-span-4 text-sm text-red-500">
                      {field.state.meta.errors.map((error) => (
                        <div key={error?.message} className="text-red-500">
                          {error?.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </form.Field>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
