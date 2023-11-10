import HttpError from "../../configs/error.js";
import TopicService from "./topic.service.js";

// [GET]
export async function getTopicList(req, res, next) {
  try {
    const result = await TopicService.getTopicList(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [POST]
export async function createTopic(req, res, next) {
  try {
    const result = await TopicService.createTopic({
      ...req.body,
      userId: req.user.id,
    });

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function proposalTopic(req, res, next) {
  try {
    const result = await TopicService.proposalTopic(req.body, req.user.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [PUT]
export async function updateTopic(req, res, next) {
  try {
    const result = await TopicService.updateTopic(req.params.id, req.body);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function registerTopic(req, res, next) {
  try {
    const result = await TopicService.registerTopic(req.params.id, req.user.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function unRegisterTopic(req, res, next) {
  try {
    const result = await TopicService.unRegisterTopic(
      req.params.id,
      req.body.userId || req.user.id
    );

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
export async function approveProposalTopic(req, res, next) {
  try {
    const result = await TopicService.approveProposalTopic(
      req.params.id,
      req.body
    );

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}

// [DELETE]
export async function deleteTopic(req, res, next) {
  try {
    const result = await TopicService.deleteTopic(req.params.id);

    res.status(200).json(result);
  } catch (error) {
    next(new HttpError(error.message.status, error.message));
  }
}
