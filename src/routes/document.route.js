import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  getDocumentList,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../components/Document/index.js";

const document = Router();

// [GET]
document.get("/", asyncHandler(getDocumentList));

// [POST]
document.post("/create", asyncHandler(createDocument));

// [PUT]
document.put("/update/:id", asyncHandler(updateDocument));

// [DELETE]
document.delete("/delete/:id", asyncHandler(deleteDocument));

export default document;
