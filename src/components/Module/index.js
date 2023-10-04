import HttpError from "../../configs/error.js";
import ModuleService from "./module.service.js";

// [GET]
export async function getModuleList(req, res, next) {
  try {
    const result = await ModuleService.getModuleList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createModule(req, res, next) {
  try {
    const result = await ModuleService.createModule(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateModule(req, res, next) {
  try {
    const result = await ModuleService.updateModule(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteModule(req, res, next) {
  try {
    const result = await ModuleService.deleteModule(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
