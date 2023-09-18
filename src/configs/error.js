import * as http from "http";

class HttpError extends Error {
  status;
  message;
  name;

  constructor(status, message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.status = status || 500;
    this.name = this.name || "HttpError";
    this.message = message || http.STATUS_CODES[this.status] || "Error";
  }
}

export default HttpError;
