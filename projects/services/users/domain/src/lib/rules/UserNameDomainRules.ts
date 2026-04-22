import { IDomainRule } from "common";
import { InvalidUserNameError } from "../errors/InvalidUserNameError";

export class UserNameDomainRules implements IDomainRule<string> {
    constructor(
        readonly minLength: number,
        readonly maxLength: number
    ) {

    }
    isValid(value: string): boolean {
        try {
            this.check(value);
            return true;
        } catch (error) {
            return false;
        }
    }

    check(value: string): void {
        if (!value || value.trim().length === 0) {
            throw new InvalidUserNameError("value can't be null nor whitespace");
        }
        if (value.length < this.minLength || value.length > this.maxLength) {
            throw new InvalidUserNameError(`value length must be between ${this.minLength} and ${this.maxLength}`);
        }
        const pattern = /^[a-zA-Z0-9_]+$/;
        if (!pattern.test(value)) {
            throw new InvalidUserNameError("value must only contains alphanumeric and underscore characters");
        }
    }

}
