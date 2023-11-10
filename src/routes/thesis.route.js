import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  approveThesis,
  createThesis,
  deleteThesis,
  getThesisList,
  updateThesis,
  getThesisDetail,
  createFinishThesis,
  assignReviewTeacher,
  updateCouncil,
  getReportFinishThesisList,
} from "../components/Thesis/index.js";
import {
  adminAuthentication,
  authentication,
  studentAuthentication,
} from "../middlewares/authentications.js";

const thesis = Router();

// [GET]
thesis.get(
  "/",
  authentication,
  adminAuthentication,
  asyncHandler(getThesisList)
);
thesis.get(
  "/total",
  authentication,
  adminAuthentication,
  asyncHandler(getReportFinishThesisList)
);
thesis.get(
  "/:id",
  authentication,
  studentAuthentication,
  asyncHandler(getThesisDetail)
);

// [POST]
thesis.post(
  "/create",
  authentication,
  studentAuthentication,
  asyncHandler(createThesis)
);
thesis.post(
  "/create-finish",
  authentication,
  adminAuthentication,
  asyncHandler(createFinishThesis)
);

// [PUT]
thesis.put("/update/:id", authentication, asyncHandler(updateThesis));
thesis.put(
  "/approve/:id",
  authentication,
  adminAuthentication,
  asyncHandler(approveThesis)
);
thesis.put(
  "/delete/:id",
  authentication,
  adminAuthentication,
  asyncHandler(deleteThesis)
);
thesis.put(
  "/assign-teacher/:id",
  authentication,
  adminAuthentication,
  asyncHandler(assignReviewTeacher)
);
thesis.put(
  "/council/:id",
  authentication,
  adminAuthentication,
  asyncHandler(updateCouncil)
);

export default thesis;
