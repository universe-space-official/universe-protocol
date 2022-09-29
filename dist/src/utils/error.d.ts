interface ServiceError extends Error {
    getContext?: () => Record<string, unknown>;
}
declare function toError(e: unknown): ServiceError;
export { toError };
