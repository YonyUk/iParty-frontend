import { InvalidValueError } from "common";
import { UserRole } from "../enums/UserRole";

export class InvalidUserRoleError extends InvalidValueError{
    constructor(role?:string){
        const msg = `Invalid role value; expected ${UserRole.User} or ${UserRole.Host}`;
        super(msg);
        this.name = "InvalidUserRoleError";
    }
}