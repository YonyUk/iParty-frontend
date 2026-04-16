export class UsersDomainRulesConfigOptions{
    constructor(
        readonly usernameMinLength:number,
        readonly usernameMaxLength:number,
        readonly passwordMinLength:number,
        readonly passwordMaxLength:number
    ){

    }
}