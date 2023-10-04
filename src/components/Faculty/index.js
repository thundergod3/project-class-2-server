import HttpError from "../../configs/error.js";
import FacultyService from "./faculty.service.js";

// [GET]
export async function getFacultyList(req, res, next) {
  try {
    const result = await FacultyService.getFacultyList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createFaculty(req, res, next) {
  try {
    const result = await FacultyService.createFaculty(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateFaculty(req, res, next) {
  try {
    const result = await FacultyService.updateFaculty(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteFaculty(req, res, next) {
  try {
    const result = await FacultyService.deleteFaculty(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
