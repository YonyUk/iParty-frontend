import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersApplication } from './users-application';

describe('UsersApplication', () => {
  let component: UsersApplication;
  let fixture: ComponentFixture<UsersApplication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersApplication],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersApplication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
