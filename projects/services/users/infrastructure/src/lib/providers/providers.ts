import { Provider } from "@angular/core";
import { provideIUserRepository } from "./repositories/users-repository-provider";
import { provideIUsersDomainRulesConfigProvider } from "./config/users-domain-rules-config-provider";
import { provideRegisterUserCommandHandler } from "./handlers/register-user-command-handler-provider";
import { provideRegisterUserCommandValidator } from "./validators/register-user-command-validator-provider";

export function provideUsersInfrastructure():Provider[]{
    return[
        provideIUserRepository(),
        provideIUsersDomainRulesConfigProvider(),
        provideRegisterUserCommandValidator(),
        provideRegisterUserCommandHandler()
    ]
}