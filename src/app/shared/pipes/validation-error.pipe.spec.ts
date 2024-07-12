import { ValidationErrorMessagePipe } from './validation-error.pipe';

describe('ValidationErrorPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidationErrorMessagePipe();
    expect(pipe).toBeTruthy();
  });
});
