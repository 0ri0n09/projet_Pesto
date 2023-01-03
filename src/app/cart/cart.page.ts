import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: any[];
  items = [];
  price = 0;
  delivery = 5;
  total = 0;

  constructor(private alertController: AlertController, private httpService: HttpService) { }
  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.items = this.cart;
    this.calculateTotal();
  }

  ionViewWillEnter() {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.items = this.cart;
    this.calculateTotal();
  }

  removeItem(itemToRemove: any) {
    const index = this.items.indexOf(itemToRemove);
    if (index > -1) {
      this.items.splice(index, 1);
      this.calculateTotal();
    }
    const cart = JSON.parse(localStorage.getItem('cart'));
    const indexLocalStorage = cart.findIndex(item => item.name === itemToRemove.name);
    if (indexLocalStorage > -1) {
      cart.splice(indexLocalStorage, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.calculateTotal();
    }
  }

  clearCart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.items.length = 0;
  }

  calculateTotal() {
    this.price = 0;
    this.items.forEach(item => {
      this.price += item.price;
    });
    this.total = this.price + this.delivery;
  }

  async openPaymentModal() {
    const alert = await this.alertController.create({
      header: 'Paiement non implémenté',
      message: 'La fonctionnalité de paiement n\'a pas été implémentée car elle ne rentre pas dans le cahier des charges',
      buttons: ['OK']
    });
    await alert.present();
    this.clearCart();
  }

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
