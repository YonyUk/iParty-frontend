import { TestBed } from '@angular/core/testing';
import {
  provideIUsersDomainRulesConfigProvider,
  UsersDomainRulesConfigProvider,
} from './users-domain-rules-config-provider';
import {
  IUsersDomainRulesConfigProvider,
  PasswordDomainRules,
  UserNameDomainRules,
  UsersDomainRulesConfigOptions,
} from 'users-domain';
import {
  USERS_DOMAIN_RULES_CONFIG_OPTIONS_TOKEN,
  USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
} from '../../tokens';

describe('UsersDomainRulesConfigProvider tests', () => {
  const defaultOptions: UsersDomainRulesConfigOptions = {
    usernameMinLength: 6,
    usernameMaxLength: 10,
    passwordMinLength: 6,
    passwordMaxLength: 10,
  };

  it('should create domain rules config provider', () => {
    const provider = new UsersDomainRulesConfigProvider(defaultOptions);

    expect(provider.UserNameDomainRules).toBeInstanceOf(UserNameDomainRules);
    expect(provider.UserNameDomainRules.minLength).toBe(defaultOptions.usernameMinLength);
    expect(provider.UserNameDomainRules.maxLength).toBe(defaultOptions.usernameMaxLength);

    expect(provider.PasswordDomainRules).toBeInstanceOf(PasswordDomainRules);
    expect(provider.PasswordDomainRules.minLength).toBe(defaultOptions.passwordMinLength);
    expect(provider.PasswordDomainRules.maxLength).toBe(defaultOptions.passwordMaxLength);
  });

  it('should show changes in configuration values', () => {
    const configOptions: UsersDomainRulesConfigOptions = {
      usernameMinLength: 10,
      usernameMaxLength: 20,
      passwordMinLength: 10,
      passwordMaxLength: 20,
    };

    const provider = new UsersDomainRulesConfigProvider(configOptions);

    expect(provider.UserNameDomainRules).toBeInstanceOf(UserNameDomainRules);
    expect(provider.UserNameDomainRules.minLength).toBe(configOptions.usernameMinLength);
    expect(provider.UserNameDomainRules.maxLength).toBe(configOptions.usernameMaxLength);

    expect(provider.PasswordDomainRules).toBeInstanceOf(PasswordDomainRules);
    expect(provider.PasswordDomainRules.minLength).toBe(configOptions.passwordMinLength);
    expect(provider.PasswordDomainRules.maxLength).toBe(configOptions.passwordMaxLength);
  });
});

describe('UsersDomainRulesConfigProvider provider tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: USERS_DOMAIN_RULES_CONFIG_OPTIONS_TOKEN,
          useVale: {
            usernameMinLength: 6,
            usernameMaxLength: 10,
            passwordMinLength: 6,
            passwordMaxLength: 10,
          },
        },
        provideIUsersDomainRulesConfigProvider(),
      ],
    });
  });

  it('should return a provider that injects a UsersDomainRulesConfigProvider instance with correct values', () => {
    const provider = TestBed.inject<IUsersDomainRulesConfigProvider>(
      USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
    );

    expect(provider).toBeInstanceOf(UsersDomainRulesConfigProvider);
    expect(provider.UserNameDomainRules.minLength).toBe(6);
    expect(provider.UserNameDomainRules.maxLength).toBe(10);
    expect(provider.PasswordDomainRules.minLength).toBe(6);
    expect(provider.PasswordDomainRules.maxLength).toBe(10);
  });
});
