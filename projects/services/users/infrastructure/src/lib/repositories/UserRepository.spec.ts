import {
  API_HOST_TOKEN,
  IProblemDetailsDTO
} from 'common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { mock } from 'vitest-mock-extended';
import { USER_REPOSITORY_TOKEN } from '../tokens';
import { provideIUserRepository } from '../providers/repositories/users-repository-provider';
import { UserRepository } from './UserRepository';
import { of, throwError } from 'rxjs';
import {
  Password,
  PasswordDomainRules,
  UserName,
  UserNameDomainRules,
  UserNotFoundError,
} from 'users-domain';
import { provideUserRepositoryHttpErrorMapper } from '../providers/services/user-repository-http-error-mapper-provider';

enum LoginExpectedResult {
  Ok,
  UserNotFound,
  IncorrectPassword,
}

describe('UserRepository tests', () => {
  const usernameRules = new UserNameDomainRules(6, 10);
  const passwordRules = new PasswordDomainRules(6, 10);

  const mockedHttpClient = mock<HttpClient>();

  const apiHost = 'http://api.test';

  beforeEach(() => {
    vi.resetAllMocks();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: API_HOST_TOKEN,
          useValue: apiHost,
        },
        {
          provide: HttpClient,
          useValue: mockedHttpClient,
        },
        provideIUserRepository(),
        provideUserRepositoryHttpErrorMapper()
      ],
    });
  });

  it('should provide a valid IUserRepository', () => {
    const repository = TestBed.inject(USER_REPOSITORY_TOKEN);
    expect(repository).toBeInstanceOf(UserRepository);
  });

  it.each([
    ['yonyuk', 'qwerty1234', LoginExpectedResult.Ok],
    ['yonyuk', 'qwerty1234', LoginExpectedResult.IncorrectPassword],
    ['yonyuk', 'qwerty1234', LoginExpectedResult.UserNotFound],
  ])(
    'should handle login functionality',
    async (username: string, password: string, expected: LoginExpectedResult) => {
      const _username = new UserName(username, usernameRules);
      const _password = new Password(password, passwordRules);

      if (expected === LoginExpectedResult.Ok) {
        mockedHttpClient.post.mockReturnValue(of({}));
      } else {
        const error: IProblemDetailsDTO = {
          detail:"User not found",
          instance:"",
          status:404,
          title:"not found"
        };

        mockedHttpClient.post.mockReturnValue(
          throwError(
            () =>
              new HttpErrorResponse({
                status: expected === LoginExpectedResult.IncorrectPassword ? 401 : 404,
                error
              }),
          ),
        );
      }

      const repository = TestBed.inject(USER_REPOSITORY_TOKEN);

      const act = async () => await repository.login(_username, _password);

      if (
        expected === LoginExpectedResult.Ok ||
        expected === LoginExpectedResult.IncorrectPassword
      ) {
        expect(act).not.toThrow();
        expect(mockedHttpClient.post).toHaveBeenCalledExactlyOnceWith(
          `${apiHost}/users/login`,
          expect.any(FormData),
          { withCredentials: true },
        );
        const result = await act();
        expect(result).toBe(expected === LoginExpectedResult.Ok ? true : false);
      } else {
        expect(act).rejects.toThrow(UserNotFoundError);
      }
    },
  );
});
