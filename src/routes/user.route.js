import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
} from "../components/User/index.js";

const user = Router();

// [GET]
user.get("/", asyncHandler(getUserList));

// [POST]
user.post("/create", asyncHandler(createUser));

// [PUT]
user.put("/update/:id", asyncHandler(updateUser));

// [DELETE]
user.delete("/delete/:id", asyncHandler(deleteUser));

export default user;
