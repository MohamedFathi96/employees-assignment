"use client";

import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Search } from "lucide-react";

import { Button } from "@/components/Ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/Ui/dropdown-menu";
import { Input } from "@/components/Ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/Ui/table";
import { DeleteEmployeeDialog } from "@/components/Dialogs/DeleteEmployee";
import { useMemo, useState } from "react";
import { columns } from "@/constants/EmployeeTableColumns";
import { Employee } from "@/types/employee.type";
import { Paginations } from "@/components/Paginations";
import { EmployeeDialog } from "./Dialogs/EmployeeDialog";
import { useMutateEmployee } from "@/hooks/useMutateEmployee";

export function EmployeesTable({ initialEmployees }: { initialEmployees: Employee[] }) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(null);
  const { mutateEmployee } = useMutateEmployee();

  const memoizedColumns = useMemo(
    () => columns({ onEditSelect: setEditingEmployee, onDelete: setDeletingEmployee }),
    [setEditingEmployee, setDeletingEmployee]
  );

  const table = useReactTable({
    data: initialEmployees,
    columns: memoizedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    mutateEmployee({ action: "EDIT", payload: updatedEmployee });
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    mutateEmployee({ action: "DELETE", payload: { id: employeeId } });
    setDeletingEmployee(null);
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="pl-8 max-w-sm"
            />
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Paginations table={table} />

      {editingEmployee && (
        <EmployeeDialog
          employee={editingEmployee}
          open={!!editingEmployee}
          onOpenChange={(open) => !open && setEditingEmployee(null)}
          onSave={handleUpdateEmployee}
        />
      )}

      {deletingEmployee && (
        <DeleteEmployeeDialog
          employee={deletingEmployee}
          open={!!deletingEmployee}
          onOpenChange={(open) => !open && setDeletingEmployee(null)}
          onConfirm={() => handleDeleteEmployee(deletingEmployee.id)}
        />
      )}
    </div>
  );
}
