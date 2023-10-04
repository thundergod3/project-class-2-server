import HttpError from "../../configs/error.js";
import OutlineService from "./outline.service.js";

// [GET]
export async function getOutlineList(req, res, next) {
  try {
    const result = await OutlineService.getOutlineList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createOutline(req, res, next) {
  try {
    const result = await OutlineService.createOutline(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateOutline(req, res, next) {
  try {
    const result = await OutlineService.updateOutline(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteOutline(req, res, next) {
  try {
    const result = await OutlineService.deleteOutline(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
