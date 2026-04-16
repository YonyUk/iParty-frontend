import { Password, UserName } from "users-domain";

export interface LoginCredentialsDTO{
    username:UserName;
    password:Password;
}