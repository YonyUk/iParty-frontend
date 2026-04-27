import { RegisterUserCommandValidator } from 'users-application';
import { REGISTER_USER_COMMAND_VALIDATOR_TOKEN, USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from './../../tokens';
import { mock } from 'vitest-mock-extended';
import { IUsersDomainRulesConfigProvider } from 'users-domain';
import { TestBed } from '@angular/core/testing';
import { provideRegisterUserCommandValidator } from './register-user-command-validator-provider';

describe('provideRegisterUserCommandValidator tests', () => {
  const mockedConfig = mock<IUsersDomainRulesConfigProvider>();

  TestBed.configureTestingModule({
    providers: [
      {
        provide: USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
        useValue: mockedConfig,
      },
      provideRegisterUserCommandValidator()
    ],
  });

  it("should provide a valid instance of RegisterUserCommandValidator",() => {
    const validator = TestBed.inject(REGISTER_USER_COMMAND_VALIDATOR_TOKEN);
    expect(validator).toBeInstanceOf(RegisterUserCommandValidator);
  });
});
