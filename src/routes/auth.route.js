import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  forgotPassword,
  login,
  myProfile,
  register,
  resetPassword,
} from "../components/Auth/index.js";
import { authentication } from "../middlewares/authentications.js";

const auth = Router();

// [GET]
auth.get("/my-profile", authentication, asyncHandler(myProfile));

// [POST]
auth.post("/login", asyncHandler(login));
auth.post("/register", asyncHandler(register));
auth.post("/forgot-password", asyncHandler(forgotPassword));
auth.post("/reset-password", asyncHandler(resetPassword));

export default auth;
