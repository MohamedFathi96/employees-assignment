import "dotenv/config";

import "reflect-metadata";
import { Department } from "../entities/Department.entity";
import { Role } from "../entities/Role.entity";
import { Employee } from "../entities/Employee.entity";
import { AppDataSource } from "./database";

async function seed() {
  await AppDataSource.initialize();

  const roleRepo = AppDataSource.getRepository(Role);
  const departmentRepo = AppDataSource.getRepository(Department);
  const employeeRepo = AppDataSource.getRepository(Employee);

  // Seed Roles
  const roles = ["Admin", "Manager", "Employee"];
  for (const name of roles) {
    const exists = await roleRepo.findOneBy({ name });
    if (!exists) {
      const role = new Role();
      role.name = name;
      await roleRepo.save(role);
    }
  }

  // Seed Departments
  const departments = ["HR", "Engineering", "Sales"];
  for (const name of departments) {
    const exists = await departmentRepo.findOneBy({ name });
    if (!exists) {
      const department = new Department();
      department.name = name;
      await departmentRepo.save(department);
    }
  }

  // Seed Employees
  const employees = [
    { name: "John Doe", email: "john.doe@example.com", department: "HR", role: "Admin" },
    { name: "Jane Smith", email: "jane.smith@example.com", department: "Engineering", role: "Manager" },
    { name: "Alice Johnson", email: "alice.johnson@example.com", department: "Sales", role: "Employee" },
    { name: "Bob Brown", email: "bob.brown@example.com", department: "Engineering", role: "Employee" },
    { name: "Charlie Davis", email: "charlie.davis@example.com", department: "HR", role: "Manager" },
    { name: "Diana Evans", email: "diana.evans@example.com", department: "Sales", role: "Admin" },
    { name: "Ethan Foster", email: "ethan.foster@example.com", department: "Engineering", role: "Employee" },
    { name: "Fiona Green", email: "fiona.green@example.com", department: "HR", role: "Employee" },
    { name: "George Hill", email: "george.hill@example.com", department: "Sales", role: "Manager" },
    { name: "Hannah Irwin", email: "hannah.irwin@example.com", department: "Engineering", role: "Admin" },
    { name: "Ian Jacobs", email: "ian.jacobs@example.com", department: "HR", role: "Employee" },
    { name: "Julia King", email: "julia.king@example.com", department: "Sales", role: "Employee" },
    { name: "Kevin Lee", email: "kevin.lee@example.com", department: "Engineering", role: "Manager" },
    { name: "Laura Moore", email: "laura.moore@example.com", department: "HR", role: "Admin" },
    { name: "Mike Nelson", email: "mike.nelson@example.com", department: "Sales", role: "Manager" },
    { name: "Nina Owens", email: "nina.owens@example.com", department: "Engineering", role: "Employee" },
    { name: "Oscar Perez", email: "oscar.perez@example.com", department: "HR", role: "Manager" },
    { name: "Paula Quinn", email: "paula.quinn@example.com", department: "Sales", role: "Admin" },
    { name: "Quentin Ross", email: "quentin.ross@example.com", department: "Engineering", role: "Employee" },
    { name: "Rachel Scott", email: "rachel.scott@example.com", department: "HR", role: "Employee" },
    { name: "Sam Taylor", email: "sam.taylor@example.com", department: "Sales", role: "Employee" },
    { name: "Tina Underwood", email: "tina.underwood@example.com", department: "Engineering", role: "Manager" },
    { name: "Uma Vargas", email: "uma.vargas@example.com", department: "HR", role: "Admin" },
    { name: "Victor White", email: "victor.white@example.com", department: "Sales", role: "Manager" },
    { name: "Wendy Xu", email: "wendy.xu@example.com", department: "Engineering", role: "Employee" },
    { name: "Xander Young", email: "xander.young@example.com", department: "HR", role: "Employee" },
    { name: "Yara Zane", email: "yara.zane@example.com", department: "Sales", role: "Admin" },
    { name: "Zack Allen", email: "zack.allen@example.com", department: "Engineering", role: "Employee" },
    { name: "Abby Baker", email: "abby.baker@example.com", department: "HR", role: "Manager" },
    { name: "Brian Carter", email: "brian.carter@example.com", department: "Sales", role: "Employee" },
  ];

  for (const emp of employees) {
    const exists = await employeeRepo.findOneBy({ email: emp.email });
    if (!exists) {
      const employee = new Employee();
      employee.name = emp.name;
      employee.email = emp.email;
      const department = await departmentRepo.findOneBy({ name: emp.department });
      const role = await roleRepo.findOneBy({ name: emp.role });
      if (!department || !role) {
        throw new Error(`Department or Role not found for employee: ${emp.name}`);
      }
      employee.department = department;
      employee.role = role;
      await employeeRepo.save(employee);
    }
  }

  console.log("✅ Seeding complete! 🎉");
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
