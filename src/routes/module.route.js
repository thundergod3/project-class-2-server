import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createModule,
  deleteModule,
  getModuleList,
  updateModule,
} from "../components/Module/index.js";

const module = Router();

// [GET]
module.get("/", asyncHandler(getModuleList));

// [POST]
module.post("/create", asyncHandler(createModule));

// [PUT]
module.put("/update/:id", asyncHandler(updateModule));

// [DELETE]
module.delete("/delete/:id", asyncHandler(deleteModule));

export default module;
