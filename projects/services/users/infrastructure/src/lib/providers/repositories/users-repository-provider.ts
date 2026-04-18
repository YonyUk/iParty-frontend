import { Provider } from "@angular/core";
import { UserRepository } from "../../repositories/UserRepository";
import { USER_REPOSITORY_TOKEN } from "../../tokens";

export function provideIUserRepository():Provider{
    return{
        provide:USER_REPOSITORY_TOKEN,
        useClass:UserRepository
    }
}