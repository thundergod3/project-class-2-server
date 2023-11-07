import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  adminAuthentication,
  authentication,
} from "../middlewares/authentications.js";
import {
  createSchoolYear,
  deleteSchoolYear,
  getSchoolYearList,
  updateSchoolYear,
} from "../components/SchoolYear/index.js";

const schoolYear = Router();

// [GET]
schoolYear.get("/", authentication, asyncHandler(getSchoolYearList));

// [POST]
schoolYear.post(
  "/create",
  authentication,
  adminAuthentication,
  asyncHandler(createSchoolYear)
);

// [PUT]
schoolYear.put(
  "/update/:id",
  authentication,
  adminAuthentication,
  asyncHandler(updateSchoolYear)
);

// [DELETE]
schoolYear.delete(
  "/delete/:id",
  authentication,
  adminAuthentication,
  asyncHandler(deleteSchoolYear)
);

export default schoolYear;
