import { Email } from './Email';
import { InvalidEmailFormatError } from '../errors/InvalidEmailFormatError';

describe('Email Value Object', () => {
  it.each([
    ['test@example.com', true],
    ['', false],
    ['   ', false],
    ['undefined', false],
    [undefined,false]
  ])('should handle email "%s" (valid: %s)', (emailValue, valid) => {

    const act = () => new Email(emailValue!);

    if (valid) {
      expect(act).not.toThrow();
      const email = act();
      expect(email.Value).toBe(emailValue);
    } else {
      expect(act).toThrow(InvalidEmailFormatError);
    }
  });
});
