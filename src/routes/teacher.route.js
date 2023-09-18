import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createTeacher,
  deleteTeacher,
  getTeacherList,
  updateTeacher,
} from "../components/Teacher/index.js";

const teacher = Router();

// [GET]
teacher.get("/", asyncHandler(getTeacherList));

// [POST]
teacher.post("/create", asyncHandler(createTeacher));

// [PUT]
teacher.put("/update/:id", asyncHandler(updateTeacher));

// [DELETE]
teacher.delete("/delete/:id", asyncHandler(deleteTeacher));

export default teacher;
