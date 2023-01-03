import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  getCartLength() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(!cart){
      return 0;
    }
    else {
      return cart.length;
    }
  }
}
