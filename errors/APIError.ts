import { HttpStatusCode } from "../enums/HttpStatusCode";
import BaseError from "./BaseError";

export default class APIError extends BaseError {

  constructor(name="", httpCode = HttpStatusCode.INTERNAL_SERVER, description = 'internal server error', isOperational = true) {
      super(name, httpCode, description, isOperational);
    }
}