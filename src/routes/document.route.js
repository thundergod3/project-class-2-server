import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  getDocumentList,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../components/Document/index.js";
import {
  adminAuthentication,
  authentication,
} from "../middlewares/authentications.js";

const document = Router();

// [GET]
document.get(
  "/",
  authentication,
  adminAuthentication,
  asyncHandler(getDocumentList)
);

// [POST]
document.post(
  "/create",
  authentication,
  adminAuthentication,
  asyncHandler(createDocument)
);

// [PUT]
document.put(
  "/update/:id",
  authentication,
  adminAuthentication,
  asyncHandler(updateDocument)
);

// [DELETE]
document.delete(
  "/delete/:id",
  authentication,
  adminAuthentication,
  asyncHandler(deleteDocument)
);

export default document;
