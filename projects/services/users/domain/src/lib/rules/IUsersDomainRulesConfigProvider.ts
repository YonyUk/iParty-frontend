import { PasswordDomainRules } from "./PasswordDomainRules";
import { UserNameDomainRules } from "./UserNameDomainRules";

export interface IUsersDomainRulesConfigProvider{
    get UserNameDomainRules():UserNameDomainRules;
    get PasswordDomainRules():PasswordDomainRules;
}
