import HttpError from "../../configs/error.js";
import ThesisService from "./thesis.service.js";

// [GET]
export async function getThesisList(req, res, next) {
  try {
    const result = await ThesisService.getThesisList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function getThesisDetail(req, res, next) {
  try {
    const result = await ThesisService.getThesisDetail(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function getReportFinishThesisList(req, res, next) {
  try {
    const result = await ThesisService.getReportFinishThesisList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createThesis(req, res, next) {
  try {
    const result = await ThesisService.createThesis({
      ...req.body,
      userId: req.user.id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function createFinishThesis(req, res, next) {
  try {
    const result = await ThesisService.createFinishThesis(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateThesis(req, res, next) {
  try {
    const result = await ThesisService.updateThesis(req.params.id, {
      ...req.body,
      userId: req.user.id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function approveThesis(req, res, next) {
  try {
    const result = await ThesisService.approveThesis(req.params.id, {
      userId: req.user.id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function assignReviewTeacher(req, res, next) {
  try {
    const result = await ThesisService.assignReviewTeacher(
      req.params.id,
      req.body
    );
    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function updateCouncil(req, res, next) {
  try {
    const result = await ThesisService.updateCouncil(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteThesis(req, res, next) {
  try {
    const result = await ThesisService.deleteThesis(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
