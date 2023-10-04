import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createOutline,
  deleteOutline,
  getOutlineList,
  updateOutline,
} from "../components/Outline/index.js";
import {
  authentication,
  studentAndTeacherAuthentication,
} from "../middlewares/authentications.js";

const outline = Router();

// [GET]
outline.get(
  "/",
  authentication,
  studentAndTeacherAuthentication,
  asyncHandler(getOutlineList)
);

// [POST]
outline.post(
  "/create",
  authentication,
  studentAndTeacherAuthentication,
  asyncHandler(createOutline)
);

// [PUT]
outline.put(
  "/update/:id",
  authentication,
  studentAndTeacherAuthentication,
  asyncHandler(updateOutline)
);

// [DELETE]
outline.delete(
  "/delete/:id",
  authentication,
  studentAndTeacherAuthentication,
  asyncHandler(deleteOutline)
);

export default outline;
