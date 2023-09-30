import HttpError from "../../configs/error.js";
import TopicController from "./topic.service.js";

// [GET]
export async function getTopicList(req, res, next) {
  try {
    const result = await TopicController.getTopicList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createTopic(req, res, next) {
  try {
    const result = await TopicController.createTopic(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateTopic(req, res, next) {
  try {
    const result = await TopicController.updateTopic(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteTopic(req, res, next) {
  try {
    const result = await TopicController.deleteTopic(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
