import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/index.js";

export const authentication = asyncHandler(async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await UserModel.findOne({ where: { id: decoded.id } });

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const adminAuthentication = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ where: { id: req.user.id } });

    if (user.role === "admin") next();
    else throw new Error("You are not admin!!!. Please try again");
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("You are not admin!!!. Please try again");
  }
});

export const teacherAuthentication = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ where: { id: req.user.id } });

    if (user.role === "teacher") next();
    else throw new Error("You are not teacher!!!. Please try again");
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("You are not teacher!!!. Please try again");
  }
});

export const studentAuthentication = asyncHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ where: { id: req.user.id } });

    if (user.role === "student") next();
    else throw new Error("You are not student!!!. Please try again");
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("You are not student!!!. Please try again");
  }
});

export const studentAndTeacherAuthentication = asyncHandler(
  async (req, res, next) => {
    try {
      const user = await UserModel.findOne({ where: { id: req.user.id } });

      if (["teacher", "student"].includes(user.role)) next();
      else throw new Error("You are not student!!!. Please try again");
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("You are not student!!!. Please try again");
    }
  }
);
