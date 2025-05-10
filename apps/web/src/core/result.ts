import { Err, err, fromPromise, Ok, ok, Result } from "neverthrow";
import { match } from "ts-pattern";

export { Err, err, Ok, ok, Result, fromPromise };

export type AppError =
  | DatabaseNotInitializedError
  | ValidationError
  | SystemError;

export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class DatabaseNotInitializedError extends BaseError {
  constructor() {
    super("Database not initialized Error");
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(`Validation Error: ${message}`);
  }
}

export class SystemError extends BaseError {
  constructor(message: string) {
    super(`System Error: ${message}`);
  }
}

export const toSystemError = (e: unknown): SystemError => {
  return match(e)
    .when(
      (e) => e instanceof Error,
      (e) => new SystemError(e.message),
    )
    .otherwise(() => new SystemError("An unexpected error occurred"));
};

// 便利なヘルパー関数
export function combine<T, E>(results: Result<T, E>[]): Result<T[], E> {
  const okValues: T[] = [];

  for (const result of results) {
    if (result.isErr()) {
      return err(result.error);
    }
    okValues.push(result.value);
  }

  return ok(okValues);
}

// Result<T, E>のArrayをResult<T[], E>に変換するヘルパー関数
export function sequence<T, E>(results: Result<T, E>[]): Result<T[], E> {
  return combine(results);
}

export const unwrap = <T, E>(result: Result<T, E>): T => {
  if (result.isOk()) {
    return result.value;
  } else {
    throw result.error;
  }
};
