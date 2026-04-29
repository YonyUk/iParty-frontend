import { LoginUserCommand } from 'users-application';
import { USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from 'users-infrastructure';
import {
  IUsersDomainRulesConfigProvider,
  PasswordDomainRules,
  UserNameDomainRules,
  UserNotFoundError,
} from 'users-domain';
import { LoginUserCommandHandler } from 'users-application';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { mock } from 'vitest-mock-extended';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { bootstrapHouse, bootstrapPerson } from '@ng-icons/bootstrap-icons';
import { IValidationProblemDetailsDTO, ValidationProblemDetailsError } from "common";

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  const mockedHandler = mock<LoginUserCommandHandler>();
  const mockedRouter = mock<Router>();
  const mockedLoaction = mock<Location>();
  const mockedChangeDetectorRef = mock<ChangeDetectorRef>();

  const mockedConfig: IUsersDomainRulesConfigProvider = {
    UserNameDomainRules: new UserNameDomainRules(6, 10),
    PasswordDomainRules: new PasswordDomainRules(6, 10),
  };

  beforeEach(async () => {
    vi.resetAllMocks();

    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule, NgIconComponent],
      providers: [provideIcons({ bootstrapPerson, bootstrapHouse })],
    })
      .overrideComponent(Login, {
        set: {
          providers: [
            {
              provide: LoginUserCommandHandler,
              useValue: mockedHandler,
            },
            {
              provide: Router,
              useValue: mockedRouter,
            },
            {
              provide: Location,
              useValue: mockedLoaction,
            },
            {
              provide: USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
              useValue: mockedConfig,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.form.valid).toBe(false);
  });

  it('sholud mark username as required', () => {
    const username = component.form.controls.username;

    expect(username.valid).toBe(false);
    expect(username.errors?.['required']).toBeTruthy();
  });

  it('should enforce username minimum length', () => {
    const username = component.form.controls.username;

    username.setValue('ab');
    expect(username.errors?.['minlength']).toBeTruthy();
  });

  it('should enforce username maximum length', () => {
    const username = component.form.controls.username;

    username.setValue('a'.repeat(11));
    expect(username.errors?.['maxlength']).toBeTruthy();
  });

  it('should mark password as required', () => {
    const password = component.form.controls.password;

    expect(password.valid).toBe(false);
    expect(password.errors?.['required']).toBeTruthy();
  });

  it('should enforce password minimum length', () => {
    const password = component.form.controls.password;

    password.setValue('ab');
    expect(password.errors?.['minlength']).toBeTruthy();
  });

  it('should enforce password maximum length', () => {
    const password = component.form.controls.password;

    password.setValue('a'.repeat(11));
    expect(password.errors?.['maxlength']).toBeTruthy();
  });

  it.each([
    ['yonyuk', 'qwerty1234', true, true],
    ['yony', 'qwerty1234', false, true],
    ['yony'.repeat(3), 'qwerty1234', false, true],
    ['yonyuk', 'qwert', true, false],
    ['yonyuk', 'qwert'.repeat(3), true, false],
    ['yony', 'qwert', false, false],
    ['yony'.repeat(3), 'qwert'.repeat(3), false, false],
    ['', 'qwerty1234', false, true],
    ['yonyuk', '', true, false],
    ['', '', false, false],
    ['yony', '', false, false],
    ['yony'.repeat(3), '', false, false],
    ['', 'qwert', false, false],
    ['', 'qwert'.repeat(3), false, false],
    ['yony'.repeat(3), 'qwert'.repeat(3), false, false],
  ])(
    'should handle form validation for username %s and password %s (%s: username, %s: password)',
    async (username: string, password: string, usernameValid: boolean, passwordValid: boolean) => {
      const changeDetectorRefSpy = vi.spyOn((component as any).changeDetector, 'detectChanges');

      const usernameForm = component.form.controls.username;
      const passwordForm = component.form.controls.password;

      usernameForm.setValue(username);
      passwordForm.setValue(password);

      component.onSubmit();
      await fixture.whenStable();

      if (!(usernameValid && passwordValid)) {
        expect(component.validationErrorMessage).toBeTruthy();
        expect(mockedHandler.handle).not.toHaveBeenCalled();
        expect(changeDetectorRefSpy).toHaveBeenCalledOnce();
      } else {
        expect(component.validationErrorMessage).toBeUndefined();
        expect(mockedHandler.handle).toHaveBeenCalledExactlyOnceWith(
          expect.objectContaining({
            data: expect.objectContaining({
              username,
              password,
            }),
          }),
        );
      }
      expect(component.usernameError).toBe(!usernameValid);
      expect(component.passwordError).toBe(!passwordValid);
    },
  );

  it('should call handler with correct command when form is valid', async () => {
    const expectedCommand: LoginUserCommand = {
      data: {
        username: 'yonyuk',
        password: 'qwerty1234',
      },
    };

    mockedHandler.handle.mockResolvedValue({ logged: true });
    component.form.setValue({
      username: 'yonyuk',
      password: 'qwerty1234',
    });

    await component.onSubmit();
    expect(mockedHandler.handle).toHaveBeenCalledExactlyOnceWith(expectedCommand);
    expect(component.error).toBe(false);
  });

  it('should show error when login fails (logged false)', async () => {
    const changeDetectorRefSpy = vi.spyOn((component as any).changeDetector, 'detectChanges');

    const expectedCommand: LoginUserCommand = {
      data: {
        username: 'yonyuk',
        password: 'qwerty1234',
      },
    };

    mockedHandler.handle.mockResolvedValue({ logged: false });
    component.form.setValue({
      username: 'yonyuk',
      password: 'qwerty1234',
    });

    await component.onSubmit();
    expect(mockedHandler.handle).toHaveBeenCalledExactlyOnceWith(expectedCommand);
    expect(component.error).toBe(true);
    expect(changeDetectorRefSpy).toHaveBeenCalledOnce();
    expect(component.errorMessage).toBe('Incorrect username or password');
  });

  it("should handle UserNotFoundError", async () => {
    const changeDetectorRefSpy = vi.spyOn((component as any).changeDetector,"detectChanges");

    const error = new UserNotFoundError("User not found");
    mockedHandler.handle.mockRejectedValue(error);
    component.form.setValue({
      username:"yonyuk",
      password:"qwerty1234"
    });
    await component.onSubmit();
    expect(component.error).toBe(true);
    expect(component.errorMessage).toBe(error.message);
    expect(changeDetectorRefSpy).toHaveBeenCalledOnce();
  });

  it.each([
    [true,false],
    [false,true],
    [true,true]
  ])
  ("should handle ValidationProblemDetailsError with error on username %s and error on password %s", async (
    usernameError:boolean,
    passwordError:boolean
  ) => {
    const details:Record<string,string[]> = {};
    if (usernameError) details["data.UserName"] = ['Invalid username'];
    if (passwordError) details["data.Password"] = ['Invalid password'];

    const problemDetails:IValidationProblemDetailsDTO = {
      title:"Validation errors",
      errors: details
    };

    const error = new ValidationProblemDetailsError(problemDetails);

    mockedHandler.handle.mockRejectedValue(error);
    component.form.controls.username.setValue("yonyuk");
    component.form.controls.password.setValue("qwerty1234");

    await component.onSubmit();

    expect(component.error).toBe(true);
    expect(component.errorMessage).toContain(error.message);
    if (usernameError) expect(component.errorMessage).toContain("Invalid username");
    if (passwordError) expect(component.errorMessage).toContain("Invalid password");
  });

  it("should call location.back() on cancel",() => {
    component.cancel();
    expect(mockedLoaction.back).toHaveBeenCalledOnce();
  });

});
