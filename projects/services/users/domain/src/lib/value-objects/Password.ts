import { PasswordDomainRules } from "../rules/PasswordDomainRules";

export class Password{

    private _value:string;

    constructor(
        value:string,
        rule:PasswordDomainRules
    ){
        rule.check(value);
        this._value = value;
    }

    get Value():string{
        return this._value;
    }
}