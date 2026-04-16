import { IValidationResult, IErrorDetails } from "./IValidationResult";

export class ValidationResult implements IValidationResult {

    constructor(
        private readonly result: boolean,
        private readonly _errors?: ErrorDetails[]
    ) { }

    get errors(): ErrorDetails[] | null {
        return this._errors ?? null;
    }

    get success(): boolean {
        return this.result;
    }
}

export class ErrorDetails implements IErrorDetails {
    constructor(
        private readonly _loc: string,
        private readonly _message: string
    ) { }
    get loc(): string {
        return this._loc;
    }
    get message(): string {
        return this._message;
    }

}