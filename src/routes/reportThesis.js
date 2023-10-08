import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createReportThesis,
  deleteReportThesis,
  getReportThesisList,
  updateReportThesis,
} from "../components/ReportThesis/index.js";
import {
  adminAuthentication,
  authentication,
} from "../middlewares/authentications.js";

const reportThesis = Router();

// [GET]
reportThesis.get(
  "/",
  authentication,
  adminAuthentication,
  asyncHandler(getReportThesisList)
);

// [POST]
reportThesis.post(
  "/create",
  authentication,
  adminAuthentication,
  asyncHandler(createReportThesis)
);

// [PUT]
reportThesis.put(
  "/update/:id",
  authentication,
  adminAuthentication,
  asyncHandler(updateReportThesis)
);

// [DELETE]
reportThesis.delete(
  "/delete/:id",
  authentication,
  adminAuthentication,
  asyncHandler(deleteReportThesis)
);

export default reportThesis;
