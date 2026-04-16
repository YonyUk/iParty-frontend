export class RequiredError extends Error{
    constructor(message?:string){
        super(message);
        this.name = "RequiredError";
    }
}