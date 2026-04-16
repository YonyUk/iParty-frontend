import { UserRole } from "users-domain";

export interface RegisterUserDTO{
    username:string;
    email:string;
    password:string;
    role:UserRole;
}