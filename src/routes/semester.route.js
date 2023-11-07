import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  adminAuthentication,
  authentication,
} from "../middlewares/authentications.js";
import {
  createSemester,
  deleteSemester,
  getSemesterList,
  updateSemester,
} from "../components/Semester/index.js";

const semester = Router();

// [GET]
semester.get(
  "/",
  authentication,
  adminAuthentication,
  asyncHandler(getSemesterList)
);

// [POST]
semester.post(
  "/create",
  authentication,
  adminAuthentication,
  asyncHandler(createSemester)
);

// [PUT]
semester.put(
  "/update/:id",
  authentication,
  adminAuthentication,
  asyncHandler(updateSemester)
);

// [DELETE]
semester.delete(
  "/delete/:id",
  authentication,
  adminAuthentication,
  asyncHandler(deleteSemester)
);

export default semester;
