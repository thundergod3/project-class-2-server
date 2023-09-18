import HttpError from "../../configs/error.js";
import ModuleController from "./module.service.js";

// [GET]
export async function getModuleList(req, res, next) {
  try {
    const result = await ModuleController.getModuleList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createModule(req, res, next) {
  try {
    const result = await ModuleController.createModule(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateModule(req, res, next) {
  try {
    const result = await ModuleController.updateModule(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteModule(req, res, next) {
  try {
    const result = await ModuleController.deleteModule(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
