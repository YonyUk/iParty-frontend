import { UserRole } from "../enums/UserRole";
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { UserName } from "../value-objects/UserName";

export class RegisterUserDataDTO {
    constructor(
        readonly username: UserName,
        readonly password: Password,
        readonly email: Email,
        readonly role: UserRole
    ) { }
}