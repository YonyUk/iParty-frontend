import { inject, Provider } from "@angular/core";
import { RegisterUserCommandHandler } from "users-application";
import { 
    REGISTER_USER_COMMAND_VALIDATOR_TOKEN,
    USER_REPOSITORY_TOKEN,
    USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN
} from "../../tokens";

export function provideRegisterUserCommandHandler():Provider{
    return {
        provide:RegisterUserCommandHandler,
        useFactory:() => {
            const validator = inject(REGISTER_USER_COMMAND_VALIDATOR_TOKEN);
            const repository = inject(USER_REPOSITORY_TOKEN);
            const config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
            return new RegisterUserCommandHandler(validator,repository,config);
        }
    };
}