import { LOGIN_USER_COMMAND_VALIDATOR_TOKEN, USER_REPOSITORY_TOKEN, USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from './../../tokens';
import { LoginUserCommand, LoginUserCommandHandler } from 'users-application';
import { ICommandValidator } from 'common';
import { mock } from 'vitest-mock-extended';
import { IUserRepository, IUsersDomainRulesConfigProvider, PasswordDomainRules, UserNameDomainRules } from 'users-domain';
import { TestBed } from '@angular/core/testing';
import { provideLoginUserCommandHandler } from './login-user-command-handler-provider';

describe("provideLoginUserCommandHandler tests",() => {

  const mockedValidator = mock<ICommandValidator<LoginUserCommand>>();
  const mockedRepository = mock<IUserRepository>();
  const config:IUsersDomainRulesConfigProvider = {
    UserNameDomainRules:new UserNameDomainRules(6,10),
    PasswordDomainRules:new PasswordDomainRules(6,10)
  };

  TestBed.configureTestingModule({
    providers:[
      {
        provide:LOGIN_USER_COMMAND_VALIDATOR_TOKEN,
        useValue:mockedValidator
      },
      {
        provide:USER_REPOSITORY_TOKEN,
        useValue:mockedRepository
      },
      {
        provide:USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
        useValue:config
      },
      provideLoginUserCommandHandler()
    ]
  });

  it("must provide a valid instance of LoginUserCommandHandler",() => {
    const handler = TestBed.inject(LoginUserCommandHandler);
    expect(handler).toBeInstanceOf(LoginUserCommandHandler);
  });

});
