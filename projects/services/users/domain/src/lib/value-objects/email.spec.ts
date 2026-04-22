import { Email } from './Email';
import { InvalidEmailFormatError } from '../errors/InvalidEmailFormatError';

describe('Email Value Object', () => {
  it('should create a valid email', () => {
    const validEmail = 'test@example.com';
    const email = new Email(validEmail);
    expect(email.Value).toBe(validEmail);
  });

  it('should throw an error for an invalid email', () => {
    const invalidEmail = 'test@.com';
    expect(() => new Email(invalidEmail)).toThrow(InvalidEmailFormatError);
  });
});
