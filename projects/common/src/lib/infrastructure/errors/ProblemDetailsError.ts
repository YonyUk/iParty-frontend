import { IProblemDetailsDTO } from "./dtos/IProblemDetailsDTO";

export class ProblemDetailsError extends Error {

    constructor(
        private readonly error:IProblemDetailsDTO
    ) { 
        super(error.title);
    }

    get Title():string{
        return this.error.title;
    }

    get Status():number{
        return this.error.status;
    }

    get Detail():string{
        return this.error.detail;
    }

    get Instance():string{
        return this.error.instance;
    }
}