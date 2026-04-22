import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHouses, bootstrapPerson } from '@ng-icons/bootstrap-icons';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserCommand, RegisterUserCommandHandler } from 'users-application';
import {
  provideIUsersDomainRulesConfigProvider,
  provideRegisterUserCommandHandler,
  USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
} from 'users-infrastructure';
import { UserAlreadyExistsError, UserRole } from 'users-domain';
import { Location } from '@angular/common';
import { ToggleButton } from '../../components/toggle-button/toggle-button';
import { ValidationProblemDetailsError } from 'common';

@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule, NgIconComponent, ToggleButton],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [
    provideIcons({ bootstrapHouses, bootstrapPerson }),
    provideRegisterUserCommandHandler(),
    provideIUsersDomainRulesConfigProvider(),
  ],
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly register = inject(RegisterUserCommandHandler);
  private readonly config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
  private readonly router = inject(Router);

  accountType: UserRole = UserRole.User;
  error: boolean = false;
  errorMessage: string = '';

  usernameError = false;
  emailError = false;
  passwordError = false;

  validationErrorMessage?: string;

  constructor(
    private readonly location: Location,
    private readonly changeDetector: ChangeDetectorRef,
  ) {}

  form = this.fb.nonNullable.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(this.config.UserNameDomainRules.minLength),
          Validators.maxLength(this.config.UserNameDomainRules.maxLength),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(this.config.PasswordDomainRules.minLength),
          Validators.maxLength(this.config.PasswordDomainRules.maxLength),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordsMatchValidator },
  );

  private passwordsMatchValidator(group: any) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  private resetValidationVariables() {
    this.usernameError = false;
    this.emailError = false;
    this.passwordError = false;

    this.validationErrorMessage = undefined;
  }

  private processValidationError() {
    if (this.form.get('username')?.errors?.['required']) {
      this.usernameError = true;
    }
    if (this.form.get('email')?.errors?.['required']) {
      this.emailError = true;
    }
    if (this.form.get('password')?.errors?.['required']) {
      this.passwordError = true;
    }

    if (
      this.form.get('username')?.errors?.['minlength'] ||
      this.form.get('username')?.errors?.['maxlength']
    ) {
      if (!this.validationErrorMessage) this.validationErrorMessage = '';
      this.usernameError = true;
      this.validationErrorMessage += `username length must be between ${this.config.UserNameDomainRules.minLength} and ${this.config.UserNameDomainRules.maxLength}. `;
    }
    if (this.form.get('email')?.errors?.['email']) {
      if (!this.validationErrorMessage) this.validationErrorMessage = '';
      this.emailError = true;
      this.validationErrorMessage += `Invalid email format. `;
    }
    if (
      this.form.get('password')?.errors?.['minlength'] ||
      this.form.get('password')?.errors?.['maxlength']
    ) {
      if (!this.validationErrorMessage) this.validationErrorMessage = '';
      this.passwordError = true;
      this.validationErrorMessage += `password length must be between ${this.config.PasswordDomainRules.minLength} and ${this.config.PasswordDomainRules.maxLength}. `;
    }

    if (this.form.hasError('passwordMismatch')) {
      if (!this.validationErrorMessage) this.validationErrorMessage = '';
      this.validationErrorMessage += "passwords doesn't matches";
    }

    if (
      !this.validationErrorMessage &&
      (this.usernameError || this.emailError || this.passwordError)
    ) {
      this.validationErrorMessage = 'Please, fill all the required fields';
    }
  }

  private processResponseError(error: any) {
    if (error instanceof UserAlreadyExistsError) {
      this.error = true;
      this.errorMessage = (error as UserAlreadyExistsError).message;
      this.changeDetector.detectChanges();
      return;
    }
    if (error instanceof ValidationProblemDetailsError) {
      this.error = true;
      this.errorMessage = (error as ValidationProblemDetailsError).message;
      const errors = (error as ValidationProblemDetailsError).Errors;
      if ('data.UserName' in errors) {
        this.errorMessage += ` ${errors['data.UserName'].join(';')}.`;
      }
      if ('data.Email' in errors) {
        this.errorMessage += ` ${errors['data.Email'].join(';')}.`;
      }
      if ('data.Password' in errors) {
        this.errorMessage += ` ${errors['data.Password'].join(';')}.`;
      }
      if ('data.Role' in errors) {
        this.errorMessage += ` ${errors['data.Role'].join(';')}`;
      }
      this.changeDetector.detectChanges();
      return;
    }
  }

  async onSubmit(): Promise<void> {
    this.resetValidationVariables();
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.processValidationError();
      return;
    }
    const formValue = this.form.getRawValue();
    const command: RegisterUserCommand = {
      data: {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        role: this.accountType,
      },
    };
    try {
      await this.register.handle(command);
      this.router.navigate(['users', 'login']);
    } catch (error) {
      this.processResponseError(error);
    }
  }

  cancel() {
    this.location.back();
  }

  onAccountTypeChanged(value: boolean) {
    this.accountType = value ? UserRole.Host : UserRole.User;
  }
}
