import { USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN } from 'users-infrastructure';
import { IUsersDomainRulesConfigProvider, PasswordDomainRules, UserNameDomainRules } from 'users-domain';
import { mock } from 'vitest-mock-extended';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { RegisterUserCommandHandler } from 'users-application';
import { NgIconComponent } from '@ng-icons/core';
import { ToggleButton } from '../../components/toggle-button/toggle-button';
import { Router } from '@angular/router';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  const mockedHandler = mock<RegisterUserCommandHandler>();
  const mockedRouter = mock<Router>();
  const config:IUsersDomainRulesConfigProvider = {
    UserNameDomainRules: new UserNameDomainRules(6,10),
    PasswordDomainRules: new PasswordDomainRules(6,10)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Register,NgIconComponent,ToggleButton],
    }).overrideComponent(Register,{
      set:{
        providers:[
          {
            provide:RegisterUserCommandHandler,
            useValue:mockedHandler
          },
          {
            provide:Router,
            useValue:mockedRouter
          },
          {
            provide: USERS_DOMAIN_RULES_CONFIG_PROVIDER_TOKEN,
            useValue:config
          }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
