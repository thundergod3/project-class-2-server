import HttpError from "../../configs/error.js";
import DocumentService from "./document.service.js";

// [GET]
export async function getDocumentList(req, res, next) {
  try {
    const result = await DocumentService.getDocumentList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createDocument(req, res, next) {
  try {
    const result = await DocumentService.createDocument(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateDocument(req, res, next) {
  try {
    const result = await DocumentService.updateDocument(
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
    const result = await DocumentService.deleteDocument(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
