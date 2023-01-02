import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  pizzas: any;
  initialPizzas: any;

  constructor(private alertController: AlertController,
              private httpService: HttpService) {

  }
  ngOnInit() {
    this.httpService.getData().subscribe(data => {
      this.pizzas = data;
      this.initialPizzas = this.pizzas;
    });
  }

  async createPizza() {
    const alert = await this.alertController.create({
      header: 'Ajouter une pizza',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nom'
        },
        {
          name: 'price',
          type: 'text',
          placeholder: 'Prix'
        },
        {
          name: 'ingredients',
          type: 'text',
          placeholder: 'Ingrédients'
        },
        {
          name: 'img',
          type: 'text',
          placeholder: 'Image'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmer',
          handler: (data) => {
            this.httpService.postData(data)
              .subscribe(() => {
                this.httpService.getData()
                  .subscribe(items => {
                    this.pizzas = items;
                  });
              });
          }
        }
      ]
    });
    await alert.present();
  }

  async editPizza() {
    const alert2 = await this.alertController.create({
      header: 'Modifier une pizza',
      inputs: [
        {
          name: 'image',
          type: 'text',
          placeholder: 'Image'
        },
        {
          name: 'name',
          type: 'text',
          value: 'Nom'
        },
        {
          name: 'price',
          type: 'text',
          value: 'Prix'
        },
        {
          name: 'description',
          type: 'text',
          value: 'Ingrédients'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmer',
          handler: (data) => {
            //TODO
          }
        }
      ]
    });

    await alert2.present();
  }

  async deletePizza(pizza) {
    const alert3 = await this.alertController.create({
      header: 'Supprimer une pizza',
      message: 'Cette action ne peut pas être annulée',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmer',
          handler: () => {
            this.httpService.deleteData(pizza.id).subscribe(() => {
              this.httpService.getData()
                .subscribe(items => {
                  this.pizzas = items;
                });
            });
          }
        }
      ]
    });
    await alert3.present();
  }

  searchPizzas(event) {
    const searchTerm = event.target.value;
    if (searchTerm) {
      this.pizzas = this.pizzas.filter(pizza => pizza.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
    } else {
      this.pizzas = this.initialPizzas;
    }
  }
}
