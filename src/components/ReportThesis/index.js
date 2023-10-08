import HttpError from "../../configs/error.js";
import ReportThesisService from "./reportThesis.service.js";

// [GET]
export async function getReportThesisList(req, res, next) {
  try {
    const result = await ReportThesisService.getReportThesisList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createReportThesis(req, res, next) {
  try {
    const result = await ReportThesisService.createReportThesis({
      ...req.body,
      userId: req.user.id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateReportThesis(req, res, next) {
  try {
    const result = await ReportThesisService.updateReportThesis(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteReportThesis(req, res, next) {
  try {
    const result = await ReportThesisService.deleteReportThesis(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
