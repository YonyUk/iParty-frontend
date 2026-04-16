export class ValidationError extends Error {
    constructor(
        message: string,
        private readonly _errors: IValidationErrorDetail[],
    ) {
        super(message);
    }

    get errors(): IValidationErrorDetail[] {
        return this._errors;
    }
}

export interface IValidationErrorDetail {
    get loc(): string;
    get message(): string;
}

export class ValidationErrorDetail {
    constructor(
        private readonly _loc: string,
        private readonly _msg: string
    ) {

    }

    get loc(): string {
        return this._loc;
    }

    get message(): string {
        return this._msg;
    }
}