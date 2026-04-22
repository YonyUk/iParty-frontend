import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-toggle-button',
  imports: [FormsModule],
  templateUrl: './toggle-button.html',
  styleUrl: './toggle-button.css',
})
export class ToggleButton {

  value:boolean = false;
  @Output() valueChanged = new EventEmitter<boolean>();

  onChange(value:boolean){
    this.valueChanged.emit(value);
  }

}
