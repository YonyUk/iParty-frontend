import { Provider } from "@angular/core";
import { provideIUsersDomainRulesConfigProvider } from "./config/users-domain-rules-config-provider";
import { provideRepositories } from "./repositories/provider";
import { provideHandlers } from "./handlers/provider";
import { provideValidators } from "./validators/provider";

export function provideUsersInfrastructure():Provider[]{
    return[
        ...provideRepositories(),
        provideIUsersDomainRulesConfigProvider(),
        ...provideHandlers(),
        ...provideValidators()
    ]
}
