import z, { ZodObject } from "zod";
import { ValidationError, ValidationErrorDetail } from "common";
import { IUsersDomainRulesConfigProvider } from "users-domain";
import { LoginUserCommand } from "../LoginUserCommand";

export class LoginUserCommandValidator {
    private validationSchema: ZodObject;

    constructor(
        usersDomainRulesConfigProvider: IUsersDomainRulesConfigProvider
    ) {
        const passworRules = usersDomainRulesConfigProvider.PasswordDomainRules;
        const usernameRules = usersDomainRulesConfigProvider.UserNameDomaiRules;

        this.validationSchema = z.object({
            username: z.string().max(usernameRules.maxLenght).min(usernameRules.minLength)
                .regex(/^w+$/),
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