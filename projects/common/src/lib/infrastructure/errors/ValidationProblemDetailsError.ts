export class ValidationProblemDetailsError extends Error {
    constructor(

        private readonly title: string,
        private readonly errors: {
            [field: string]: string[]
        }
    ) {
        super(title);
    }

    get Title(): string {
        return this.title;
    }

    get Errors(): { [field: string]: string[] } {
        return this.errors;
    }
}