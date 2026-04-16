import { IDomainRule } from "common";
import { InvalidPasswordError } from "../errors/InvalidPasswordError";

export class PasswordDomainRules implements IDomainRule<string> {

    constructor(
        readonly minLength: number,
        readonly maxLength: number
    ) { }

    check(value: string): void {
        if(!value || value.trim().length === 0){
            throw new InvalidPasswordError("value can't be null nor whitespace");
        }
        if(value.length < this.minLength || value.length > this.maxLength){
            throw new InvalidPasswordError(`value length must be between ${this.minLength} and ${this.maxLength}`);
        }
    }

    isValid(value: string): boolean {
        try {
            this.check(value);
            return true;
        } catch (error) {
            return false;
        }
    }

}