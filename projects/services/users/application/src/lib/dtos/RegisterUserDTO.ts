import { Email, Password, UserName, UserRole } from "users-domain";

export interface RegisterUserDTO{
    username:UserName;
    email:Email;
    password:Password;
    role:UserRole;
}