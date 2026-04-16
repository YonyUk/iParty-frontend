import { UserRole } from "../enums/UserRole";

export interface IUserCriteria{
    page:number;
    role:UserRole;
}