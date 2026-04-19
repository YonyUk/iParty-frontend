import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHouses,bootstrapPerson } from '@ng-icons/bootstrap-icons';
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
import { ToogleButton } from "../../components/toogle-button/toogle-button";

@Component({
  selector: 'lib-register',
  imports: [ReactiveFormsModule, NgIconComponent, ToogleButton],
  templateUrl: './register.html',
  styleUrl: './register.css',
  providers: [
    provideIcons({ bootstrapHouses, bootstrapPerson }),
    provideRegisterUserCommandHandler(),
    provideIUsersDomainRulesConfigProvider(),
  ],
})
export class Register {
  private fb = inject(FormBuilder);
  private register = inject(RegisterUserCommandHandler);
  private config = inject(USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN);
  private router = inject(Router);

  accountType:UserRole = UserRole.User;
  error: boolean = false;
  errorMessage: string = '';

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
          Validators.minLength(this.config.UserNameDomaiRules.minLength),
          Validators.maxLength(this.config.UserNameDomaiRules.maxLenght),
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

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
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
      if (error instanceof UserAlreadyExistsError) {
        this.error = true;
        this.errorMessage = (error as UserAlreadyExistsError).message;
        this.changeDetector.detectChanges();
      }
    }
  }

  cancel() {
    this.location.back();
  }

  onAccountTypeChanged(value:boolean){
    this.accountType = value ? UserRole.Host : UserRole.User;
    console.log(this.accountType);
  }
}
