import { ValidationError } from 'common';
import { LoginUserCommand, LoginUserCommandValidator } from 'users-application';
import {
  IUsersDomainRulesConfigProvider,
  PasswordDomainRules,
  UserNameDomainRules,
} from 'users-domain';
enum ExpectedResult {
  Ok,
  UsernameError,
  PasswordError,
  DataError,
}

describe('LoginUserCommandValidator test', () => {
  const usernameRules = new UserNameDomainRules(6, 10);
  const passwordRules = new PasswordDomainRules(6, 10);

  const userDomainRulesConfigProvider: IUsersDomainRulesConfigProvider = {
    UserNameDomainRules: usernameRules,
    PasswordDomainRules: passwordRules,
  };

  // const

  it.each([
    ['yonyuk', 'qwerty1234', ExpectedResult.Ok],
    ['yony', 'qwerty1234', ExpectedResult.UsernameError],
    ['yonyyonyyony', 'qwerty1234', ExpectedResult.UsernameError],
    ['yonyuk', 'qwert', ExpectedResult.PasswordError],
    ['yonyuk', 'qwertqwertqwert', ExpectedResult.PasswordError],
    ['yony', 'qwert', ExpectedResult.DataError],
    ['yony', 'qwertqwertqwert', ExpectedResult.DataError],
    ['yonyyonyyony', 'qwert', ExpectedResult.DataError],
    ['yonyyonyyony', 'qwertqwertqwert', ExpectedResult.DataError],
  ])('should handle validation', (username: string, password: string, expected: ExpectedResult) => {
    const validator = new LoginUserCommandValidator(userDomainRulesConfigProvider);
    const command: LoginUserCommand = {
      data: {
        username,
        password,
      },
    };

    const act = () => validator.validate(command);

    if (expected === ExpectedResult.Ok) {
      expect(act).not.toThrow();
    } else {
      expect(act).toThrow(ValidationError);

      try {
        validator.validate(command);
        expect.fail("Validation error expected");
      } catch (error) {

        expect(error).toBeInstanceOf(ValidationError);
        const validationError = error as ValidationError;

        switch (expected) {

          case ExpectedResult.UsernameError:
            expect(validationError.errors).toHaveLength(1);
            const usernameDetail = validationError.errors[0];
            expect(usernameDetail.loc.toLowerCase()).toMatch(/.*username.*/);
            break;

          case ExpectedResult.PasswordError:
            expect(validationError.errors).toHaveLength(1);
            const passwordDetail = validationError.errors[0];
            expect(passwordDetail.loc.toLowerCase()).toMatch(/.*password.*/)
            break;

          case ExpectedResult.DataError:
            expect(validationError.errors).toHaveLength(2);
            const uDetail = validationError.errors.find((error,_) => error.loc.toLowerCase().includes("username"));
            const pDetail = validationError.errors.find((error,_) => error.loc.toLowerCase().includes("password"));

            expect(uDetail).not.toBeUndefined();
            expect(pDetail).not.toBeUndefined();
        }
      }
    }
  });
});
