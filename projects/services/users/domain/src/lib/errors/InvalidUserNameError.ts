import { InvalidValueError } from "common";

export class InvalidUserNameError extends InvalidValueError{
    constructor(message?:string){
        super(message);
        this.name = "InvalidUserNameError";
    }
}