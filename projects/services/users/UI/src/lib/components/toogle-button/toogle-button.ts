import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-toogle-button',
  imports: [FormsModule],
  templateUrl: './toogle-button.html',
  styleUrl: './toogle-button.css',
})
export class ToogleButton {

  value:boolean = true;

  print(){
    console.log(this.value);
  }

}
