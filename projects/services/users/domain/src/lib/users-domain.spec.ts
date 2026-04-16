import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDomain } from './users-domain';

describe('UsersDomain', () => {
  let component: UsersDomain;
  let fixture: ComponentFixture<UsersDomain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDomain],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDomain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
