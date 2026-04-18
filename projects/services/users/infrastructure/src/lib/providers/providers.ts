import { Provider } from "@angular/core";
import { provideIUserRepository } from "./repositories/users-repository-provider";
import { provideIUsersDomainRulesConfigProvider } from "./config/users-domain-rules-config-provider";
import { provideRegisterUserCommandHandler } from "./handlers/register-user-command-handler-provider";

export function provideUsersInfrastructure():Provider[]{
    return[
        provideIUserRepository(),
        provideIUsersDomainRulesConfigProvider(),
        provideRegisterUserCommandHandler()
    ]
}