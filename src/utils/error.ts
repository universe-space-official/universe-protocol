interface ServiceError extends Error {
  getContext?: () => Record<string, unknown>;
}

function toError(e: unknown): ServiceError {
  if (e instanceof Error) {
    return e;
  }

  return new Error('Error Type Unknown: ' + e.toString());
}

export { toError };
