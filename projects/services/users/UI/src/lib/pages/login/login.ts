import { ValidationProblemDetailsError } from 'common';
import { UserNotFoundError } from 'users-domain';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from 'users-infrastructure';
import { LoginUserCommand, LoginUserCommandHandler } from 'users-application';

@Component({
  selector: 'lib-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
  private authenticator = inject(LoginUserCommandHandler);

  constructor(private readonly changeDetector: ChangeDetectorRef) {}

  error: boolean = false;
  errorMessage: string = '';

  validationErrorMessage?: string;

  usernameError = false;
  passwordError = false;

  form = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(this.config.UserNameDomaiRules.minLength),
        Validators.maxLength(this.config.UserNameDomaiRules.maxLenght),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.config.PasswordDomainRules.minLength),
        Validators.maxLength(this.config.PasswordDomainRules.maxLength),
      ],
    ],
  });

  private resetValidationVariables() {
    this.error = false;
    this.errorMessage = '';

    this.validationErrorMessage = undefined;
    this.usernameError = false;
    this.passwordError = false;
  }

  private processResponseError(error: any) {
    if (error instanceof UserNotFoundError) {
      this.error = true;
      this.errorMessage = (error as UserNotFoundError).message;
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
      if ('data.Password' in errors) {
        this.errorMessage += ` ${errors['data.Password'].join(';')}.`;
      }
      this.changeDetector.detectChanges();
    }
  }

  private processValidationError() {
    if (this.form.get('username')?.errors?.['required']) {
      this.usernameError = true;
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
      this.validationErrorMessage += `username length must be between ${this.config.UserNameDomaiRules.minLength} and ${this.config.UserNameDomaiRules.maxLenght}. `;
    }
    if (
      this.form.get('password')?.errors?.['minlength'] ||
      this.form.get('password')?.errors?.['maxlength']
    ) {
      if (!this.validationErrorMessage) this.validationErrorMessage = '';
      this.passwordError = true;
      this.validationErrorMessage += `password length must be between ${this.config.PasswordDomainRules.minLength} and ${this.config.PasswordDomainRules.maxLength}. `;
    }

    if (!this.validationErrorMessage && (this.usernameError || this.passwordError)) {
      this.validationErrorMessage = 'Please, fill all the required values';
    }
  }

  async onSubmit(): Promise<void> {
    this.resetValidationVariables();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.processValidationError();
      this.changeDetector.detectChanges();
      return;
    }

    const formValue = this.form.getRawValue();
    const command: LoginUserCommand = {
      data: {
        username: formValue.username,
        password: formValue.password,
      },
    };

    try {
      const response = await this.authenticator.handle(command);
      if (!response.logged) {
        this.error = true;
        this.errorMessage = 'Incorrect username or password';
        this.changeDetector.detectChanges();
      }
    } catch (error) {
      this.processResponseError(error);
    }
  }
}
