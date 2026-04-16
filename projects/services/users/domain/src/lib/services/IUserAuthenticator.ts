import { Password } from "../value-objects/Password";
import { UserName } from "../value-objects/UserName";

export interface IUserAuthenticator {
    authenticate(username: UserName, password: Password): Promise<void>;
}