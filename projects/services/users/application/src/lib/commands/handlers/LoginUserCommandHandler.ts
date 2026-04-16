import { IUserAuthenticator, IUsersDomainRulesConfigProvider, Password, UserName } from "users-domain";
import { ICommandHandler, ICommandHandlerAsync, ICommandValidator } from "common";
import { LoginUserCommand } from "../LoginUserCommand";
import { LoginResponseDTO } from "../../dtos/LoginResponseDTO";

export class LoginUserCommandHandler implements ICommandHandlerAsync<LoginUserCommand, LoginResponseDTO> {

    constructor(
        private readonly validator: ICommandValidator<LoginUserCommand>,
        private readonly userAuthenticator: IUserAuthenticator,
        private readonly configProvider: IUsersDomainRulesConfigProvider
    ) {

    }
    async handle(command: LoginUserCommand): Promise<LoginResponseDTO> {
        this.validator.validate(command);
        const username = new UserName(command.data.username, this.configProvider.UserNameDomaiRules);
        const password = new Password(command.data.password, this.configProvider.PasswordDomainRules);
        const logged = await this.userAuthenticator.authenticate(username, password);
        return { logged }

    }

}