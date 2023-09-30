import HttpError from "../../configs/error.js";
import UserController from "./user.service.js";

// [GET]
export async function getUserList(req, res, next) {
  try {
    const result = await UserController.getUserList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createUser(req, res, next) {
  try {
    const result = await UserController.createUser(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateUser(req, res, next) {
  try {
    const result = await UserController.updateUser(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteUser(req, res, next) {
  try {
    const result = await UserController.deleteUser(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
