export type Department = {
  id: number;
  name: string;
};

export type Employee = {
  id: number;
  name: string;
  email: string;
  role: Role;
  department: Department;
};
export type Role = {
  id: number;
  name: string;
};

export type EmployeeDialogProps = {
  open: boolean;
  employee?: Employee | null;
  onOpenChange: (open: boolean) => void;
  onSave: (employee: Employee) => void;
};
