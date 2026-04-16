import { InvalidValueError } from "common";

export class InvalidEmailFormatError extends InvalidValueError{
    constructor(message?:string){
        super(message);
        this.name = "InvalidEmailFormatError";
    }
}