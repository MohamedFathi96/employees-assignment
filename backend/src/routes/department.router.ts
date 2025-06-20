import { Router } from "express";
import * as departmentController from "../controllers/department.controller";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(departmentController.getAll));
// router.get("/:id", asyncHandler(departmentController.getById));
// router.post("/", asyncHandler(departmentController.create));
// router.put("/:id", asyncHandler(departmentController.update));
// router.delete("/:id", asyncHandler(departmentController.remove));

export default router;
