import { Router } from "express";
import asyncHandler from "express-async-handler";

import { uploadFile } from "../components/UploadFile/index.js";
import { authentication } from "../middlewares/authentications.js";

const uploadFileRoute = Router();

// [POST]
uploadFileRoute.post("/", authentication, asyncHandler(uploadFile));

export default uploadFileRoute;
