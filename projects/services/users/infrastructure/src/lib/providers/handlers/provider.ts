import { Provider } from "@angular/core";
import { provideRegisterUserCommandHandler } from "./register-user-command-handler-provider";

export function provideHandlers():Provider[]{
  return [
    provideRegisterUserCommandHandler()
  ]
}
