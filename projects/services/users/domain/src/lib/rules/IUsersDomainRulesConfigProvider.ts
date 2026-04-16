import { PasswordDomainRules } from "./PasswordDomainRules";
import { UserNameDomainRules } from "./UserNameDomainRules";

export interface IUsersDomainRulesConfigProvider{
    get UserNameDomaiRules():UserNameDomainRules;
    get PasswordDomainRules():PasswordDomainRules;
}