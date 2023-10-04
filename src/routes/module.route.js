import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createModule,
  deleteModule,
  getModuleList,
  updateModule,
} from "../components/Module/index.js";
import {
  adminAuthentication,
  authentication,
} from "../middlewares/authentications.js";

const module = Router();

// [GET]
module.get(
  "/",
  authentication,
  adminAuthentication,
  asyncHandler(getModuleList)
);

// [POST]
module.post(
  "/create",
  authentication,
  adminAuthentication,
  asyncHandler(createModule)
);

// [PUT]
module.put(
  "/update/:id",
  authentication,
  adminAuthentication,
  asyncHandler(updateModule)
);

// [DELETE]
module.delete(
  "/delete/:id",
  authentication,
  adminAuthentication,
  asyncHandler(deleteModule)
);

export default module;
