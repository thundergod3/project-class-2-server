import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
} from "../components/User/index.js";
import {
  adminAuthentication,
  authentication,
} from "../middlewares/authentications.js";

const user = Router();

// [GET]
user.get("/", authentication, adminAuthentication, asyncHandler(getUserList));

// [POST]
user.post(
  "/create",
  authentication,
  adminAuthentication,
  asyncHandler(createUser)
);

// [PUT]
user.put(
  "/update/:id",
  authentication,
  adminAuthentication,
  asyncHandler(updateUser)
);

// [DELETE]
user.delete(
  "/delete/:id",
  authentication,
  adminAuthentication,
  asyncHandler(deleteUser)
);

export default user;
