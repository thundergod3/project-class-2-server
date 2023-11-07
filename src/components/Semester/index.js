import HttpError from "../../configs/error.js";
import SemesterService from "./semester.service.js";

// [GET]
export async function getSemesterList(req, res, next) {
  try {
    const result = await SemesterService.getSemesterList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createSemester(req, res, next) {
  try {
    const result = await SemesterService.createSemester(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateSemester(req, res, next) {
  try {
    const result = await SemesterService.updateSemester(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteSemester(req, res, next) {
  try {
    const result = await SemesterService.deleteSemester(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
