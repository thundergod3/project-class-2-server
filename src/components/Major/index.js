import HttpError from "../../configs/error.js";
import MajorController from "./major.service.js";

// [GET]
export async function getMajorList(req, res, next) {
  try {
    const result = await MajorController.getMajorList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createMajor(req, res, next) {
  try {
    const result = await MajorController.createMajor(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateMajor(req, res, next) {
  try {
    const result = await MajorController.updateMajor(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteMajor(req, res, next) {
  try {
    const result = await MajorController.deleteMajor(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
