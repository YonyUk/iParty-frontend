import {
  IUserRepository,
  IUsersDomainRulesConfigProvider,
  PasswordDomainRules,
  UserNameDomainRules,
  UserNotFoundError,
} from 'users-domain';
import { LoginUserCommand, LoginUserCommandHandler } from 'users-application';
import { ICommandValidator, ValidationError, ValidationErrorDetail } from 'common';
import { mock } from 'vitest-mock-extended';

enum ExpectedResult {
  Ok,
  UsernameError,
  PasswordError,
  IncorrectPassword,
  UserNotFound,
}

describe('LoginUserCommandHandler tests', () => {
  const usernameRules = new UserNameDomainRules(6, 10);
  const passwordRules = new PasswordDomainRules(6, 10);

  const rules: IUsersDomainRulesConfigProvider = {
    UserNameDomainRules: usernameRules,
    PasswordDomainRules: passwordRules,
  };

  const mockedValidator = mock<ICommandValidator<LoginUserCommand>>();
  const mockedRepository = mock<IUserRepository>();

  beforeEach(() => vi.resetAllMocks());

  it.each([
    ['yonyuk', 'qwerty1234', ExpectedResult.Ok],
    ['yony', 'qwerty1234', ExpectedResult.UsernameError],
    ['yonyuk', 'qwert', ExpectedResult.PasswordError],
    ['yonyuk', 'qwerty1234', ExpectedResult.IncorrectPassword],
    ['yonyuk', 'qwerty1234', ExpectedResult.UserNotFound],
  ])(
    'should handle login command',
    async (username: string, password: string, expected: ExpectedResult) => {
      mockedRepository.login.mockResolvedValue(expected === ExpectedResult.Ok ? true : false);

      if (expected === ExpectedResult.UsernameError || expected === ExpectedResult.PasswordError) {
        mockedValidator.validate.mockImplementation(() => {
          throw new ValidationError('validation errors', [
            new ValidationErrorDetail(
              expected === ExpectedResult.UsernameError ? 'data.username' : 'data.password',
              'validation error',
            ),
          ]);
        });
      }

      if (expected === ExpectedResult.UserNotFound) {
        mockedRepository.login.mockRejectedValue(new UserNotFoundError('user not found'));
      }

      const handler = new LoginUserCommandHandler(mockedValidator, mockedRepository, rules);
      const command: LoginUserCommand = {
        data: {
          username,
          password,
        },
      };

      const act = async () => await handler.handle(command);

      if (expected === ExpectedResult.Ok || expected === ExpectedResult.IncorrectPassword) {

        await expect(act).not.toThrow();
        expect(mockedValidator.validate).toHaveBeenCalledOnce();
        expect(mockedRepository.login).toHaveBeenCalledOnce();
        const response = await act();
        expect(response.logged).toBe(expected === ExpectedResult.Ok ? true : false);

      } else if (
        expected === ExpectedResult.UsernameError ||
        expected === ExpectedResult.PasswordError
      ) {

        await expect(act).rejects.toThrow(ValidationError);
        expect(mockedValidator.validate).toHaveBeenCalledOnce();

      } else {

        await expect(act).rejects.toThrow(UserNotFoundError);
        expect(mockedValidator.validate).toHaveBeenCalledOnce();
        expect(mockedRepository.login).toHaveBeenCalledOnce();

      }
    }
  );
});
