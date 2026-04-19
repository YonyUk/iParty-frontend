export interface IValidationProblemDetailsDTO {
    title: string;
    errors: { [field: string]: string[] }
}