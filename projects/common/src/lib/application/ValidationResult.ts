import { IValidationResult, ErrorDetails } from "./IValidationResult";

export class ValidationResult implements IValidationResult {
    private _errors:ErrorDetails[] = [];

    constructor(
        private readonly result: boolean
    ) { }

    get errors(): ErrorDetails[] | null {
        return this._errors;
    }

    get success(): boolean {
        return this.result;
    }

    addError(error:ErrorDetails):void{
        this._errors.push(error);
    }

}