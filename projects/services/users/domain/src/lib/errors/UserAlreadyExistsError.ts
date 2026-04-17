import { AlreadyExistsError } from "common";

export class UserAlreadyExistsError extends AlreadyExistsError{
    constructor(message:string){
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}