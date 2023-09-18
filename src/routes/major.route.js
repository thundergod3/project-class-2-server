import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createMajor,
  deleteMajor,
  getMajorList,
  updateMajor,
} from "../components/Major/index.js";

const major = Router();

// [GET]
major.get("/", asyncHandler(getMajorList));

// [POST]
major.post("/create", asyncHandler(createMajor));

// [PUT]
major.put("/update/:id", asyncHandler(updateMajor));

// [DELETE]
major.delete("/delete/:id", asyncHandler(deleteMajor));

export default major;
