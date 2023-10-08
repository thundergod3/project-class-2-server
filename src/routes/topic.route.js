import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  getTopicList,
  createTopic,
  updateTopic,
  deleteTopic,
  registerTopic,
  unRegisterTopic,
  proposalTopic,
} from "../components/Topic/index.js";
import {
  authentication,
  studentAuthentication,
  teacherAuthentication,
} from "../middlewares/authentications.js";

const topic = Router();

// [GET]
topic.get("/", authentication, asyncHandler(getTopicList));

// [POST]
topic.post(
  "/create",
  authentication,
  teacherAuthentication,
  asyncHandler(createTopic)
);
topic.post(
  "/proposal",
  authentication,
  studentAuthentication,
  asyncHandler(proposalTopic)
);

// [PUT]
topic.put(
  "/update/:id",
  authentication,
  teacherAuthentication,
  asyncHandler(updateTopic)
);
topic.put(
  "/register/:id",
  authentication,
  studentAuthentication,
  asyncHandler(registerTopic)
);
topic.put(
  "/un-register/:id",
  authentication,
  studentAuthentication,
  asyncHandler(unRegisterTopic)
);

// [DELETE]
topic.delete(
  "/delete/:id",
  authentication,
  teacherAuthentication,
  asyncHandler(deleteTopic)
);

export default topic;
