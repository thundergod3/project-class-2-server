import HttpError from "../../configs/error.js";
import TeacherController from "./teacher.service.js";

// [GET]
export async function getTeacherList(req, res, next) {
  try {
    const result = await TeacherController.getTeacherList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createTeacher(req, res, next) {
  try {
    const result = await TeacherController.createTeacher(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateTeacher(req, res, next) {
  try {
    const result = await TeacherController.updateTeacher(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteTeacher(req, res, next) {
  try {
    const result = await TeacherController.deleteTeacher(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
