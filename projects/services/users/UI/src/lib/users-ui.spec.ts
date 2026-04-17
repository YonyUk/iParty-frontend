import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUi } from './users-ui';

describe('UsersUi', () => {
  let component: UsersUi;
  let fixture: ComponentFixture<UsersUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersUi],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersUi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
