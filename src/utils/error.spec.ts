import { toError } from './error';

describe('convert other types to errors', () => {
  it('passes errors through', () => {
    const e = new Error('test error');
    const myError = toError(e);

    expect(myError instanceof Error).toBe(true);
    expect(e).toBe(myError);
  });

  it('handles strings', () => {
    const e = 'test error';
    const myError = toError(e);

    expect(myError instanceof Error).toBe(true);
    expect(myError.message).toBe('Error Type Unknown: test error');
  });

  it('handles numbers', () => {
    const e = 42;
    const myError = toError(e);

    expect(myError instanceof Error).toBe(true);
    expect(myError.message).toBe('Error Type Unknown: 42');
  });

  it('handles custom errors', () => {
    class CustomError extends Error {
      constructor(message: string) {
        super(message);
        this.name = 'Custom Error';
      }
    }

    const testError = new CustomError('test error');
    const myError = toError(testError);

    expect(myError instanceof Error).toBe(true);
    expect(myError instanceof CustomError).toBe(true);
    expect(myError.message).toBe('test error');
    expect(myError.name).toBe('Custom Error');
  });
});
