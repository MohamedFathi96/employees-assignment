import { Router } from "express";
import * as roleController from "../controllers/role.controller";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.get("/", asyncHandler(roleController.getAll));
// router.get("/:id", asyncHandler(roleController.getById));
// router.post("/", asyncHandler(roleController.create));
// router.put("/:id", asyncHandler(roleController.update));
// router.delete("/:id", asyncHandler(roleController.remove));

export default router;
