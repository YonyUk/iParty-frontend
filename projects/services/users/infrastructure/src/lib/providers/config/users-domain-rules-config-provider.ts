import { inject, Provider } from "@angular/core";
import { USERS_DOMAIN_RULES_CONFIG_OPTIONS_TOKEN, USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from "../../tokens";
import { IUsersDomainRulesConfigProvider, PasswordDomainRules, UserNameDomainRules, UsersDomainRulesConfigOptions } from "users-domain";

export class UsersDomainRulesConfigProvider implements IUsersDomainRulesConfigProvider {
    private usernameRules: UserNameDomainRules;
    private passwordRules: PasswordDomainRules;

    constructor(
        options: UsersDomainRulesConfigOptions
    ) {
        this.usernameRules = new UserNameDomainRules(options.usernameMinLength, options.usernameMaxLength);
        this.passwordRules = new PasswordDomainRules(options.passwordMinLength, options.passwordMaxLength);
    }

    get UserNameDomainRules(): UserNameDomainRules {
        return this.usernameRules;
    }

    get PasswordDomainRules(): PasswordDomainRules {
        return this.passwordRules;
    }

}

export function provideIUsersDomainRulesConfigProvider(): Provider {
    return {
        provide: USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
        useFactory:() => {
            const configOptions = inject(USERS_DOMAIN_RULES_CONFIG_OPTIONS_TOKEN);
            return new UsersDomainRulesConfigProvider(configOptions);
        }
    };
}
