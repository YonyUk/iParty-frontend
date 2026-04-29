import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButton } from './toggle-button';

describe('ToogleButton', () => {
  let component: ToggleButton;
  let fixture: ComponentFixture<ToggleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButton,FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have initial value on false and unchecked checkbox",() => {

    const input:HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(input.checked).toBe(false);
    expect(component.value).toBe(false);
  });

  it("should emit valueChanged when checkbox is toggled on", async () => {
    const emitSpy = vi.spyOn(component.valueChanged,'emit');
    const input:HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');

    input.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value).toBe(true);
    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(true);
  });

  it("should emit valueChanged when checkbox is toggled off", async () => {
    const emitSpy = vi.spyOn(component.valueChanged,'emit');
    const input:HTMLInputElement = fixture.nativeElement.querySelector('input[type="checkbox"]');

    input.click();
    fixture.detectChanges();
    await fixture.whenStable();

    vi.resetAllMocks();

    input.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value).toBe(false);
    expect(emitSpy).toHaveBeenCalledExactlyOnceWith(false);
  });

  it('should call onChange and emit value when model changes programmatically', () => {
    const emitSpy = vi.spyOn(component.valueChanged, 'emit');
    component.onChange(true);
    expect(emitSpy).toHaveBeenCalledWith(true);
    component.onChange(false);
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

});
