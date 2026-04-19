import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToogleButton } from './toogle-button';

describe('ToogleButton', () => {
  let component: ToogleButton;
  let fixture: ComponentFixture<ToogleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToogleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ToogleButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
