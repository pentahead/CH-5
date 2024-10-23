class BadRequestError extends Error {
  constructor(errors) {
    super("Validation failed!");
    this.errors = errors;
    this.status = 400;
  }
}
class Unauthorized extends Error {
  constructor(errors) {
    super("Unauthorized!");
    this.errors = errors;
    this.status = 401;
  }
}
class Forbidden extends Error {
  constructor(errors) {
    super("Forbidden Error!");
    this.errors = errors;
    this.status = 403;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    if (message) {
      super(message);
    } else {
      super("Data is Not Found!");
    }
    this.status = 404;
  }
}

class InternalServerError extends Error {
  constructor(errors) {
    super("Internal Server Error");
    this.status = 500;
    this.errors = errors;
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  InternalServerError,
  Unauthorized,
  Forbidden,
};
