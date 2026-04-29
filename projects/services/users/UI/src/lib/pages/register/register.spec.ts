import { IUserRepository } from 'users-domain';
import { REGISTER_USER_COMMAND_VALIDATOR_TOKEN, USER_REPOSITORY_TOKEN } from 'users-infrastructure';
import { mock } from 'vitest-mock-extended';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { RegisterUserCommandHandler, RegisterUserCommandValidator } from 'users-application';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  const mockedRegisterUserCommandHandler = mock<RegisterUserCommandHandler>();
  const mockedValidator = mock<RegisterUserCommandValidator>();
  const mockedRepository = mock<IUserRepository>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register],
      providers:[
        {
          provide:REGISTER_USER_COMMAND_VALIDATOR_TOKEN,
          useValue:mockedValidator
        },
        {
          provide:USER_REPOSITORY_TOKEN,
          useValue:mockedRepository
        },
        {

        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
