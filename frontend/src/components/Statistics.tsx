import { Users, Building, UserPlus } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Ui/card";
import { useEmployees } from "@/hooks/useEmployees";
import { useDepartments } from "@/hooks/useDepartments";
import { useRoles } from "@/hooks/useRoles";

const Statistics = () => {
  const { data: employees = [] } = useEmployees();
  const { data: departments = [] } = useDepartments();
  const { data: roles = [] } = useRoles();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{employees.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Departments</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{departments.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Roles</CardTitle>
          <UserPlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{roles.length}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
