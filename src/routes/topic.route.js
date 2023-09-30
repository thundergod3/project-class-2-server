import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  getTopicList,
  createTopic,
  updateTopic,
  deleteTopic,
} from "../components/Topic/index.js";

const topic = Router();

// [GET]
topic.get("/", asyncHandler(getTopicList));

// [POST]
topic.post("/create", asyncHandler(createTopic));

// [PUT]
topic.put("/update/:id", asyncHandler(updateTopic));

// [DELETE]
topic.delete("/delete/:id", asyncHandler(deleteTopic));

export default topic;
