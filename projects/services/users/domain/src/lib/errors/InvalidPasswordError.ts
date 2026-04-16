import { InvalidValueError } from "common";

export class InvalidPasswordError extends InvalidValueError{
    constructor(message?:string){
        super(message);
        this.name = "InvalidPasswordError";
    }
}