import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-toogle-button',
  imports: [FormsModule],
  templateUrl: './toogle-button.html',
  styleUrl: './toogle-button.css',
})
export class ToogleButton {

  value:boolean = false;
  @Output() valueChanged = new EventEmitter<boolean>();

  onChange(value:boolean){
    this.valueChanged.emit(value);
  }

}
