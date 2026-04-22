import z, { ZodObject } from "zod";
import { ICommandValidator, ValidationError, ValidationErrorDetail } from "common";
import { IUsersDomainRulesConfigProvider } from "users-domain";
import { LoginUserCommand } from "../LoginUserCommand";

export class LoginUserCommandValidator implements ICommandValidator<LoginUserCommand> {
    private validationSchema: ZodObject;

    constructor(
        usersDomainRulesConfigProvider: IUsersDomainRulesConfigProvider
    ) {
        const passworRules = usersDomainRulesConfigProvider.PasswordDomainRules;
        const usernameRules = usersDomainRulesConfigProvider.UserNameDomainRules;

        this.validationSchema = z.object({
            username: z.string().max(usernameRules.maxLength).min(usernameRules.minLength)
                .regex(/^\w+$/),
            password: z.string().max(passworRules.maxLength).min(passworRules.minLength)
        });
    }

    validate(command: LoginUserCommand): void {
        const result = this.validationSchema.safeParse(command.data);
        if (result.success) {
            return;
        }
        const errors = result.error.issues.map(issue => new ValidationErrorDetail(
            issue.path.join('.'),
            issue.message
        ));
        throw new ValidationError("There is validation errors on login credentials data", errors);
    }
}
