import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createMajor,
  deleteMajor,
  getMajorList,
  updateMajor,
} from "../components/Major/index.js";
import { authentication } from "../middlewares/authentications.js";

const major = Router();

// [GET]
major.get("/", authentication, asyncHandler(getMajorList));

// [POST]
major.post("/create", authentication, asyncHandler(createMajor));

// [PUT]
major.put("/update/:id", authentication, asyncHandler(updateMajor));

// [DELETE]
major.delete("/delete/:id", authentication, asyncHandler(deleteMajor));

export default major;
