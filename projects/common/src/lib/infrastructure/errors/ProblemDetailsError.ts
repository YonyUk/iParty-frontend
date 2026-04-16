export class ProblemDetailsDTO extends Error {

    constructor(

        private readonly title: string,
        private readonly status: number,
        private readonly detail: string,
        private readonly instance: string
    ) { 
        super(title);
    }

    get Title():string{
        return this.title;
    }

    get Status():number{
        return this.status;
    }

    get Detail():string{
        return this.detail;
    }

    get Instance():string{
        return this.instance;
    }
}