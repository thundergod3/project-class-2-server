import HttpError from "../../configs/error.js";
import AuthService from "./auth.service.js";

// [GET]
export async function myProfile(req, res, next) {
  try {
    const result = await AuthService.myProfile(req.user.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function login(req, res, next) {
  try {
    const result = await AuthService.login(req, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function register(req, res, next) {
  try {
    const result = await AuthService.register(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const result = await AuthService.forgotPassword(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

export async function resetPassword(req, res, next) {
  try {
    const result = await AuthService.resetPassword(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
