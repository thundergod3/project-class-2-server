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
  approveProposalTopic,
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
topic.put(
  "/approve-proposal/:id",
  authentication,
  teacherAuthentication,
  asyncHandler(approveProposalTopic)
);

// [DELETE]
topic.delete("/delete/:id", authentication, asyncHandler(deleteTopic));

export default topic;
