export class HTTPError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class InternalServerError extends HTTPError {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnprocessableEntityError extends HTTPError {
  constructor(message: string) {
    super(message, 422);
  }
}

export class UnauthenticatedError extends HTTPError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 400);
  }
}
