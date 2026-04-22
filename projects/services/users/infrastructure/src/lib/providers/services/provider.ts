import { Provider } from "@angular/core";
import { provideUserRepositoryHttpErrorMapper } from "./user-repository-http-error-mapper-provider";

export function provideHttpErrorMappers():Provider[]{
  return [
    provideUserRepositoryHttpErrorMapper()
  ];
}
