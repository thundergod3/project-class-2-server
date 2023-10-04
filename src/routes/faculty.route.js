import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createFaculty,
  deleteFaculty,
  getFacultyList,
  updateFaculty,
} from "../components/Faculty/index.js";
import { authentication } from "../middlewares/authentications.js";

const faculty = Router();

// [GET]
faculty.get("/", authentication, asyncHandler(getFacultyList));

// [POST]
faculty.post("/create", authentication, asyncHandler(createFaculty));

// [PUT]
faculty.put("/update/:id", authentication, asyncHandler(updateFaculty));

// [DELETE]
faculty.delete("/delete/:id", authentication, asyncHandler(deleteFaculty));

export default faculty;
