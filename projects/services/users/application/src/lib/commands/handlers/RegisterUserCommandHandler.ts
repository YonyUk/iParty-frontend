import { ICommandHandlerAsync, ICommandValidator } from "common";
import { RegisterUserCommand } from "../RegisterUserCommand";
import { RegisterUserResponseDTO } from "../../dtos/RegisterUserResponseDTO";
import { Email, IUserRepository, IUsersDomainRulesConfigProvider, Password, RegisterUserDataDTO, UserName } from "users-domain";

export class RegisterUserCommandHandler implements ICommandHandlerAsync<RegisterUserCommand, RegisterUserResponseDTO> {

    constructor(
        private readonly validator: ICommandValidator<RegisterUserCommand>,
        private readonly repository: IUserRepository,
        private readonly usersDomainRulesConfigProvider: IUsersDomainRulesConfigProvider
    ) {

    }

    async handle(command: RegisterUserCommand): Promise<RegisterUserResponseDTO> {
        this.validator.validate(command);
        const usernameRules = this.usersDomainRulesConfigProvider.UserNameDomainRules;
        const passwordRules = this.usersDomainRulesConfigProvider.PasswordDomainRules;
        const username = new UserName(command.data.username, usernameRules);
        const email = new Email(command.data.email);
        const password = new Password(command.data.password, passwordRules);
        const role = command.data.role;
        const id = await this.repository.register({
            username,
            email,
            password,
            role
        });
        return { id }
    }

}
