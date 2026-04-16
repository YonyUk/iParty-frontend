import { IValidationResult, ErrorDetails } from "./IValidationResult";

export class ValidationResult implements IValidationResult {

    constructor(
        private readonly result: boolean,
        private readonly _errors?:ErrorDetails[]
    ) { }

    get errors(): ErrorDetails[] | null {
        return this._errors ?? null;
    }

    get success(): boolean {
        return this.result;
    }
}