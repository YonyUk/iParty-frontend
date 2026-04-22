import { ICommandValidator, ValidationError, ValidationErrorDetail } from "common";
import { RegisterUserCommand } from "../RegisterUserCommand";
import z, { ZodObject } from "zod";
import { IUsersDomainRulesConfigProvider, UserRole } from "users-domain";

export class RegisterUserCommandValidator implements ICommandValidator<RegisterUserCommand> {
    private validationSchema: ZodObject;

    constructor(
        usersDomainRulesConfigProvider: IUsersDomainRulesConfigProvider
    ) {
        const usernameRules = usersDomainRulesConfigProvider.UserNameDomainRules;
        const passworRules = usersDomainRulesConfigProvider.PasswordDomainRules;

        this.validationSchema = z.object({
            username: z.string().max(usernameRules.maxLenght).min(usernameRules.minLength)
                .regex(/^\w+$/),
            password: z.string().max(passworRules.maxLength).min(passworRules.minLength),
            email: z.email(),
            role: z.enum(UserRole)
        });
    }

    validate(command: RegisterUserCommand): void {
        const result = this.validationSchema.safeParse(command.data);
        if (!result.success){
            const errors = result.error.issues.map(issue => new ValidationErrorDetail(
                issue.path.join('.'),
                issue.message
            ));
            throw new ValidationError("There is validation errors on register data",errors);
        }
    }

}
