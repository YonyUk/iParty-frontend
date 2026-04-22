import { Provider } from "@angular/core";
import { provideRegisterUserCommandValidator } from "./register-user-command-validator-provider";
import { provideLoginUserCommandValidator } from "./login-user-command-validator-provider";

export function provideValidators():Provider[]{
  return [
    provideRegisterUserCommandValidator(),
    provideLoginUserCommandValidator()
  ]
}
