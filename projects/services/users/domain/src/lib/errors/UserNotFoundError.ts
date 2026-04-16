import { NotFoundError } from "common";

export class UserNotFoundError extends NotFoundError {
    constructor(fieldName: string, fieldValue: any) {
        super(`A user with ${fieldName} '${fieldValue.toString()}' doesn't exists`);
        this.name = "UserNotFoundError";
    }
}