import { inject, Provider } from "@angular/core";
import { LoginUserCommandValidator } from "users-application";
import { LOGIN_USER_COMMAND_VALIDATOR_TOKEN, USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from "../../tokens";

export function provideLoginUserCommandValidator():Provider{
  return {
    provide:LOGIN_USER_COMMAND_VALIDATOR_TOKEN,
    useFactory:() => {
      const config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
      return new LoginUserCommandValidator(config)
    }
  };
}
