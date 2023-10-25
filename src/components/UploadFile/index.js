import HttpError from "../../configs/error.js";
import UploadFileService from "./upload-file.service.js";

// [POST]
export async function uploadFile(req, res, next) {
  try {
    const file = req.body.data;

    const result = await UploadFileService.uploadFile(file);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
