import { z } from "zod";
import { InvalidEmailFormatError } from "../errors/InvalidEmailFormatError";

export class Email {

    private _value: string;

    private emailSchema = z.email(); 

    constructor(
        value: string
    ) {
        if (!value || value.trim().length === 0) {
            throw new InvalidEmailFormatError("value can't be null nor whitespace");
        }
        if (!this.emailSchema.safeParse(value).success){
            throw new InvalidEmailFormatError("value is not a valid email string");
        }
        this._value = value;
    }

    get Value():string{
        return this._value;
    }
}