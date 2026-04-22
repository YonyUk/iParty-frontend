import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButton } from './toggle-button';

describe('ToogleButton', () => {
  let component: ToggleButton;
  let fixture: ComponentFixture<ToggleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
