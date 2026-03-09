class InternalServerError extends Error {
  constructor({ cause, status_code }) {
    super("Um erro interno não esperado aconteceu.", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte.";
    this.status_code = status_code || 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause ? this.cause.toString() : null,
      action: this.action,
      status_code: this.status_code,
    };
  }
}

class ServiceError extends Error {
  constructor({ cause, message }) {
    super(message || "Serviço indisponível no momento.", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Verifique se o serviço está disponível.";
    this.status_code = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause ? this.cause.toString() : null,
      action: this.action,
      status_code: this.status_code,
    };
  }
}

class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para este endpoint.");
    this.name = "MethodNotAllowedError";
    this.action =
      "Verifique se o método http enviado é valido para este end-point";
    this.status_code = 405;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.status_code,
    };
  }
}

export { InternalServerError, MethodNotAllowedError, ServiceError };
