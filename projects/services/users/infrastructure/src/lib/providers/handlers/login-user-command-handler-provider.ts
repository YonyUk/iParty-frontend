import { inject, Provider } from "@angular/core";
import { LoginUserCommandHandler } from "users-application";
import { LOGIN_USER_COMMAND_VALIDATOR_TOKEN, USER_AUTHENTICATOR_TOKEN, USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from "../../tokens";

export function provideLoginUserCommandHandler():Provider{
  return {
    provide:LoginUserCommandHandler,
    useFactory:() => {
      const validator = inject(LOGIN_USER_COMMAND_VALIDATOR_TOKEN);
      const authenticator = inject(USER_AUTHENTICATOR_TOKEN);
      const config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
      return new LoginUserCommandHandler(validator,authenticator,config);
    }
  }
}
