export interface ValidationProblemDetailsDTO {
    title: string;
    errors: {
        [field: string]: string[]
    }
}