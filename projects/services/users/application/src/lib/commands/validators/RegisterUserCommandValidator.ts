import { ICommandValidator, ValidationError, ValidationErrorDetail } from 'common';
import { RegisterUserCommand } from '../RegisterUserCommand';
import z, { ZodEmail, ZodEnum, ZodObject, ZodString } from 'zod';
import { IUsersDomainRulesConfigProvider, UserRole } from 'users-domain';

export class RegisterUserCommandValidator implements ICommandValidator<RegisterUserCommand> {
  private validationSchema: ZodObject<{
    username: ZodString;
    password: ZodString;
    email: ZodEmail;
    role: ZodEnum;
  }>;

  constructor(usersDomainRulesConfigProvider: IUsersDomainRulesConfigProvider) {
    const usernameRules = usersDomainRulesConfigProvider.UserNameDomainRules;
    const passworRules = usersDomainRulesConfigProvider.PasswordDomainRules;

    this.validationSchema = z.object({
      username: z.string().max(usernameRules.maxLength).min(usernameRules.minLength).regex(/^\w+$/),
      password: z.string().max(passworRules.maxLength).min(passworRules.minLength),
      email: z.email(),
      role: z.enum(UserRole),
    });
  }

  validate(command: RegisterUserCommand): void {
    const result = this.validationSchema.safeParse(command.data);
    if (!result.success) {
      const errors = result.error.issues.map(
        (issue) => new ValidationErrorDetail(issue.path.join('.'), issue.message),
      );
      throw new ValidationError('There is validation errors on register data', errors);
    }
  }
}
