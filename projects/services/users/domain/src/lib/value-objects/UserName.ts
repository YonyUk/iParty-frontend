import { UserNameDomainRules } from "../rules/UserNameDomainRules";

export class UserName{
    
    private _value:string;

    constructor(
        value:string,
        rules:UserNameDomainRules
    ){
        rules.check(value);
        this._value = value;
    }

    get Value():string{
        return this._value;
    }
}