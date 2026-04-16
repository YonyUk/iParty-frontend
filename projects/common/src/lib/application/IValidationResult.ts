export interface IValidationResult{
    get success():boolean;
    get errors():ErrorDetails[] | null;
}

export interface ErrorDetails{
    get loc():string;
    get message():string;
}