import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public readonly inputControl = new FormControl('11111');

  constructor() {
    this.inputControl.valueChanges.subscribe((val) => {
      console.log('Control value: :', val);
    })
  }
}
