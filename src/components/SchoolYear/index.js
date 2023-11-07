import HttpError from "../../configs/error.js";
import SchoolYearService from "./schoolYear.service.js";

// [GET]
export async function getSchoolYearList(req, res, next) {
  try {
    const result = await SchoolYearService.getSchoolYearList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createSchoolYear(req, res, next) {
  try {
    const result = await SchoolYearService.createSchoolYear(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateSchoolYear(req, res, next) {
  try {
    const result = await SchoolYearService.updateSchoolYear(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteSchoolYear(req, res, next) {
  try {
    const result = await SchoolYearService.deleteSchoolYear(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
