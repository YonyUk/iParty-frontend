import { InjectionToken } from "@angular/core";
import { IUserRepository, IUsersDomainRulesConfigProvider, UsersDomainRulesConfigOptions } from "users-domain";
import { ICommandValidator } from "common";
import { RegisterUserCommand } from "users-application";

export const USERS_DOMAIN_RULES_CONFIG_OPTIONS_TOKEN = new InjectionToken<UsersDomainRulesConfigOptions>(
    'USERS_DOMAIN_RULES_CONFIG_OPTIONS_TOKEN',
    {
        factory: () => ({
            usernameMinLength:6,
            usernameMaxLength:10,
            passwordMinLength:6,
            passwordMaxLength:10
        })
    }
);
export const USER_REPOSITORY_TOKEN = new InjectionToken<IUserRepository>('USER_REPOSITORY_TOKEN');
export const USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN = new InjectionToken<IUsersDomainRulesConfigProvider>(
    'USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN'
);
export const REGISTER_USER_COMMAND_VALIDATOR_TOKEN = new InjectionToken<ICommandValidator<RegisterUserCommand>>(
    'REGISTER_USER_COMMAND_VALIDATOR_TOKEN'
);