import "dotenv/config";

import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./configs/database";
import employeeRouter from "./routes/employee.router";
import exceptionMiddleware from "./middlewares/exception.middleware";
import departmentRouter from "./routes/department.router";
import roleRouter from "./routes/role.router";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/employees", employeeRouter);
app.use("/api/roles", roleRouter);
app.use("/api/departments", departmentRouter);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Successfully connected to the database");
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

// Global error handler
app.use(exceptionMiddleware);
