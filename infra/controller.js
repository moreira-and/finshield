import {
  InternalServerError,
  MethodNotAllowedError,
  ValidationError,
} from "infra/errors.js";

function onErrorHandler(error, request, response) {
  if (error instanceof ValidationError) {
    return response.status(error.status_code).json(error);
  }

  const publicErrorObject = new InternalServerError({
    cause: error,
    status_code: error.status_code,
  });
  return response.status(publicErrorObject.status_code).json(publicErrorObject);
}

function onNoMatchHandler(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  return response.status(publicErrorObject.status_code).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onError: onErrorHandler,
    onNoMatch: onNoMatchHandler,
  },
};

export default controller;
