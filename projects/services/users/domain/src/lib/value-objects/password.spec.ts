import { Password } from './Password';
import { PasswordDomainRules } from '../rules/PasswordDomainRules';
import { InvalidPasswordError } from '../errors/InvalidPasswordError';

describe('Password value object', () => {
  const rules = new PasswordDomainRules(6, 10);

  it.each([
    ['qwerty1234',true],
    ['qwert',false],
    ['',false],
    ['   ',false],
    [undefined,false]
  ])('should handle password %s (valid: %s)', (passwordValue,valid) => {
    const act = () => new Password(passwordValue!, rules);

    if(valid){
      expect(act).not.toThrow();
      const password = act();
      expect(password.Value).toBe(passwordValue);
    } else{
      expect(act).toThrow(InvalidPasswordError);
    }
  });

});
