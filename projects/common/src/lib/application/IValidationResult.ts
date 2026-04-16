export interface IValidationResult{
    get success():boolean;
    get errors():ErrorDetails[] | null;
}

export interface IErrorDetails{
    get loc():string;
    get message():string;
}