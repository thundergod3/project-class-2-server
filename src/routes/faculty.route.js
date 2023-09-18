import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createFaculty,
  deleteFaculty,
  getFacultyList,
  updateFaculty,
} from "../components/Faculty/index.js";

const faculty = Router();

// [GET]
faculty.get("/", asyncHandler(getFacultyList));

// [POST]
faculty.post("/create", asyncHandler(createFaculty));

// [PUT]
faculty.put("/update/:id", asyncHandler(updateFaculty));

// [DELETE]
faculty.delete("/delete/:id", asyncHandler(deleteFaculty));

export default faculty;
