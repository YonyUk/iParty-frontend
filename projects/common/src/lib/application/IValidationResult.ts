export interface IValidationResult{
    get success():boolean;
    get errors():IErrorDetails[] | null;
}

export interface IErrorDetails{
    get loc():string;
    get message():string;
}