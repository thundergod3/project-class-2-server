import HttpError from "../../configs/error.js";
import DocumentController from "./document.service.js";

// [GET]
export async function getDocumentList(req, res, next) {
  try {
    const result = await DocumentController.getDocumentList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createDocument(req, res, next) {
  try {
    const result = await DocumentController.createDocument(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateDocument(req, res, next) {
  try {
    const result = await DocumentController.updateDocument(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteDocument(req, res, next) {
  try {
    const result = await DocumentController.deleteDocument(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
