import { LoginUserCommandValidator } from 'users-application';
import { LOGIN_USER_COMMAND_VALIDATOR_TOKEN } from './../../tokens';
import { TestBed } from "@angular/core/testing";
import { USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from "../../tokens";
import { mock } from "vitest-mock-extended";
import { IUsersDomainRulesConfigProvider } from "users-domain";
import { provideLoginUserCommandValidator } from './login-user-command-validator-provider';

describe("provideLoginUserCommandValidator tests",() => {

  const mockedConfig = mock<IUsersDomainRulesConfigProvider>();

  TestBed.configureTestingModule({
    providers:[
      {
        provide:USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
        useValue:mockedConfig
      },
      provideLoginUserCommandValidator()
    ]
  });

  it("should provide a valid LoginUserCommandValidator instance",() => {
    const validator = TestBed.inject(LOGIN_USER_COMMAND_VALIDATOR_TOKEN);
    expect(validator).toBeInstanceOf(LoginUserCommandValidator);
  });
});
