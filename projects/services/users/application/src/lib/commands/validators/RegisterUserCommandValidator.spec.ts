import { ValidationError } from 'common';
import { RegisterUserCommand, RegisterUserCommandValidator } from 'users-application';
import {
  IUsersDomainRulesConfigProvider,
  PasswordDomainRules,
  UserNameDomainRules,
  UserRole,
} from 'users-domain';

describe('RegisterUserCommandValidator test', () => {
  const usernameRules = new UserNameDomainRules(6, 10);
  const passwordRules = new PasswordDomainRules(6, 10);

  const rules: IUsersDomainRulesConfigProvider = {
    PasswordDomainRules: passwordRules,
    UserNameDomainRules: usernameRules,
  };

  const validator = new RegisterUserCommandValidator(rules);

  it.each([
    ['yonyuk', 'test@example.com', 'qwerty1234', true, true, true],
    ["yony","test@example.com","qwerty1234",false,true,true],
    ["yonyyonyyony","test@example.com","qwerty1234",false,true,true],
    ['yonyuk', 'testexample.com', 'qwerty1234', true, false, true],
    ['yonyuk', 'test@example.com', 'qwert', true, true, false],
    ['yonyuk', 'test@example.com', 'qwertqwertqwert', true, true, false],
    ['yony', 'test@example.com', 'qwertqwertqwert', false, true, false],
    ['yonyyonyyony', 'test@example.com', 'qwertqwertqwert', false, true, false],
    ['yonyyonyyony', 'test@example.com', 'qwert', false, true, false],
    ['yony', 'test@example.com', 'qwert', false, true, false],
    ['yony', 'testexample.com', 'qwert', false, false, false],
    ['yonyyonyyony', 'testexample.com', 'qwert', false, false, false],
    ['yonyyonyyony', 'testexample.com', 'qwertqwertqwert', false, false, false],
  ])(
    'should handle user registration test',
    (
      username: string,
      email: string,
      password: string,
      usernameValid: boolean,
      emailValid: boolean,
      passwordValid: boolean,
    ) => {
      const command: RegisterUserCommand = {
        data: {
          username,
          email,
          password,
          role:UserRole.User
        }
      };

      const act = () => validator.validate(command);

      if (usernameValid && emailValid && passwordValid) {
        expect(act).not.toThrow();
      } else {
        expect(act).toThrow(ValidationError);

        try {
          validator.validate(command);
          expect.fail('Validation error expected');
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
          const validationError = error as ValidationError;

          if(!usernameValid){
            const uDetail = validationError.errors.find((error,_) => error.loc.toLowerCase().includes("username"));
            expect(uDetail).not.toBeUndefined();
          }

          if (!passwordValid){
            const pDetail = validationError.errors.find((error,_) => error.loc.toLowerCase().includes("password"));
            expect(pDetail).not.toBeUndefined();
          }

          if (!emailValid){
            const eDetail = validationError.errors.find((error,_) => error.loc.toLowerCase().includes("email"));
            expect(eDetail).not.toBeUndefined();
          }
        }
      }
    }
  );
});
