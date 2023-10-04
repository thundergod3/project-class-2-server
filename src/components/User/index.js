import HttpError from "../../configs/error.js";
import UserService from "./user.service.js";

// [GET]
export async function getUserList(req, res, next) {
  try {
    const result = await UserService.getUserList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createUser(req, res, next) {
  try {
    const result = await UserService.createUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateUser(req, res, next) {
  try {
    const result = await UserService.updateUser(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteUser(req, res, next) {
  try {
    const result = await UserService.deleteUser(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
