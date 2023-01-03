import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pizzas: any;
  cart: any[];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData().subscribe(data => {
      this.pizzas = data;
      this.cart = JSON.parse(localStorage.getItem('cart'));
    });
  }

  addToCart($event: MouseEvent, id: any) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    const pizzaToAdd = this.pizzas.find(pizza => pizza.id === id);
    if(!pizzaToAdd) {
      console.log('PIZZA NOT FOUND !');
    }
    if (!this.cart) {
      this.cart = [];
    }
    this.cart.push(pizzaToAdd);
    console.log(this.cart);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
