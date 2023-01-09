import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { RefreshService } from '../services/refresh.service';
import {DetailModalComponent} from '../components/detail-modal/detail-modal.component';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pizzas: any;
  cart: any[];

  constructor(private httpService: HttpService,
              private refreshService: RefreshService,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.httpService.getData().subscribe(data => {
      this.pizzas = data;
      this.cart = JSON.parse(localStorage.getItem('cart'));
    });

    this.refreshService.refresh$.subscribe(() => {
      this.httpService.getData().subscribe(data => {
        this.pizzas = data;
        this.cart = JSON.parse(localStorage.getItem('cart'));
      });
    });
  }

  ionViewWillEnter() {
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
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  async openModal(pizza: any) {
    const modal = await this.modalCtrl.create({
      component: DetailModalComponent,
      componentProps: {
        pizza
      }
    });
    modal.present();
  }

}
