"use client";
import { EmployeesTable } from "@/components/EmployeesTable";
import Statistics from "@/components/Statistics";
import { Button } from "@/components/Ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Ui/card";
import { UserPlus } from "lucide-react";
import { useEmployees } from "@/hooks/useEmployees";
import { EmployeeDialog } from "@/components/Dialogs/EmployeeDialog";
import { Employee } from "@/types/employee.type";
import { useState } from "react";
import { useMutateEmployee } from "@/hooks/useMutateEmployee";

export default function Home() {
  const { data: employees = [] } = useEmployees();
  const { mutateEmployee } = useMutateEmployee();
  const [addingEmployee, setAddingEmployee] = useState(false);

  const handleAddingEmployee = (employee: Omit<Employee, "id">) => {
    mutateEmployee({ action: "CREATE", payload: employee });
    setAddingEmployee(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Employee Dashboard</h1>
              <p className="text-muted-foreground">Manage your team members and their information</p>
            </div>
            <Button className="gap-2" onClick={() => setAddingEmployee(true)}>
              <UserPlus className="h-4 w-4" />
              Add Employee
            </Button>
          </div>

          <Statistics />

          <Card>
            <CardHeader>
              <CardTitle>Employees</CardTitle>
              <CardDescription>A list of all employees in your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <EmployeesTable initialEmployees={employees} />
            </CardContent>
          </Card>
        </div>
      </div>

      {addingEmployee && (
        <EmployeeDialog
          open={addingEmployee}
          onOpenChange={setAddingEmployee}
          onSave={({ name, email, role, department }) => handleAddingEmployee({ name, email, role, department })}
        />
      )}
    </>
  );
}
