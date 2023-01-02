import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items = [
    {
      image: 'assets/img/item1.jpg',
      name: 'Item 1',
      description: 'This is a description of item 1',
      price: 10,
    },
    {
      image: 'assets/img/item2.jpg',
      name: 'Item 2',
      description: 'This is a description of item 2',
      price: 20,
    }
  ];
  price = 0;
  delivery = 5;
  total = 0;

  constructor(private alertController: AlertController, private httpService: HttpService) { }
  ngOnInit() {
    this.calculateTotal();
  }

  removeItem(item: any) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      this.calculateTotal();
    }
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
  }
}
