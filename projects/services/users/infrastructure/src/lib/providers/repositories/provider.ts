import { Provider } from "@angular/core";
import { provideIUserRepository } from "./users-repository-provider";

export function provideRepositories():Provider[]{
  return [
    provideIUserRepository()
  ]
}
