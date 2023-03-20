import { HttpStatusCode } from "../enums/HttpStatusCode";
import BaseError from "./BaseError";

export default class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
      super('NOT FOUND', HttpStatusCode.BAD_REQUEST, description, true);
    }
}

//----Exemple use
// const user = await User.getUserById(1);
// if (user === null)
//  throw new APIError(
//    'NOT FOUND',
//    HttpStatusCode.NOT_FOUND,
//    true,
//    'detailed explanation'
//  );