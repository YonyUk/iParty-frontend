import { inject, Provider } from "@angular/core";
import { REGISTER_USER_COMMAND_VALIDATOR_TOKEN, USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from "../../tokens";
import { RegisterUserCommandValidator } from "users-application";

export function provideRegisterUserCommandValidator():Provider{
    return {
        provide:REGISTER_USER_COMMAND_VALIDATOR_TOKEN,
        useFactory:() => {
            const config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
            return new RegisterUserCommandValidator(config);
        }
    };
}