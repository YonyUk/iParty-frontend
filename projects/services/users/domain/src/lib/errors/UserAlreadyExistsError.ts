import { AlreadyExistsError } from "common";

export class UserAlreadyExistsError extends AlreadyExistsError{
    constructor(fieldName:string,fieldValue:any){
        super(`A user with ${fieldName} '${fieldValue.toString()}' already exists`);
        this.name = "UserAlreadyExistsError";
    }
}