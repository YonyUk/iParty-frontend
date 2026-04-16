import { UserRole } from "../enums/UserRole";
import { Email } from "../value-objects/Email";
import { Password } from "../value-objects/Password";
import { UserName } from "../value-objects/UserName";

export interface RegisterUserDataDTO {
    username: UserName;
    password: Password;
    email: Email;
    role: UserRole;
}