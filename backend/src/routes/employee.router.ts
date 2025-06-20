import { Router, RequestHandler } from "express";
import * as employeeController from "../controllers/employee.controller";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(employeeController.getAll));
router.get("/:id", asyncHandler(employeeController.getById));
router.post("/", asyncHandler(employeeController.create));
router.put("/:id", asyncHandler(employeeController.update));
router.delete("/:id", asyncHandler(employeeController.remove));

export default router;
