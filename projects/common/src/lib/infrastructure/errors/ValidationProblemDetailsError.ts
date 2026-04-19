import { IValidationProblemDetailsDTO } from "./dtos/IValidationProblemDetailsDTO";

export class ValidationProblemDetailsError extends Error {
    constructor(
        private readonly error: IValidationProblemDetailsDTO
    ) {
        super(error.title);
    }

    get Title(): string {
        return this.error.title;
    }

    get Errors(): { [field: string]: string[] } {
        return this.error.errors;
    }
}