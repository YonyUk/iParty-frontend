import { inject, Provider } from "@angular/core";
import { LoginUserCommandValidator } from "users-application";
import { USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from "../../tokens";

export function provideLoginUserCommandValidator():Provider{
  return {
    provide:LoginUserCommandValidator,
    useFactory:() => {
      const config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
      return new LoginUserCommandValidator(config)
    }
  };
}
