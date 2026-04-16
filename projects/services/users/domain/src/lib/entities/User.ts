import { UserRole } from "../enums/UserRole";
import { Email } from "../value-objects/Email";
import { UserName } from "../value-objects/UserName";

export class User {
    constructor(
        readonly Id: string,
        readonly UserName: UserName,
        readonly Email: Email,
        readonly Role: UserRole
    ) { }
}