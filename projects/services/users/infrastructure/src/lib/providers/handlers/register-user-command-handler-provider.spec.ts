import { REGISTER_USER_COMMAND_VALIDATOR_TOKEN, USER_REPOSITORY_TOKEN, USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from './../../tokens';
import { IUserRepository, IUsersDomainRulesConfigProvider, UserNameDomainRules } from 'users-domain';
import { RegisterUserCommand, RegisterUserCommandHandler } from 'users-application';
import { ICommandValidator } from 'common';
import { mock } from "vitest-mock-extended"
import { TestBed } from '@angular/core/testing';
import { provideRegisterUserCommandHandler } from './register-user-command-handler-provider';

describe("provideRegisterUserCommandHandler tests",() => {

  const mockedValidator = mock<ICommandValidator<RegisterUserCommand>>();
  const mockedRepository = mock<IUserRepository>();
  const mockedConfig = mock<IUsersDomainRulesConfigProvider>();

  TestBed.configureTestingModule({
    providers:[
      {
        provide:REGISTER_USER_COMMAND_VALIDATOR_TOKEN,
        useValue:mockedValidator
      },
      {
        provide:USER_REPOSITORY_TOKEN,
        useValue:mockedRepository
      },
      {
        provide:USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
        useValue:mockedConfig
      },
      provideRegisterUserCommandHandler()
    ]
  });

  it("should provide a valid RegisterUserCommandHandler instance",() => {
    const handler = TestBed.inject(RegisterUserCommandHandler);
    expect(handler).toBeInstanceOf(RegisterUserCommandHandler);
  });

});
