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
    const addAlert = await this.alertController.create({
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
          handler: async (data) => {
            if (this.pizzas.some(pizza => pizza.name.localeCompare(data.name, undefined, {sensitivity: 'base'}) === 0)) {
              const errorAlert = await this.alertController.create({
                header: 'Erreur survenue',
                message: 'Le nom que vous avez rentré existe déjà',
                buttons: ['OK']
              });
              await errorAlert.present();
              return;
            }
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
    await addAlert.present();
  }

  async editPizza(pizza) {
    const editAlert = await this.alertController.create({
      header: 'Modifier une pizza',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: pizza.name
        },
        {
          name: 'price',
          type: 'text',
          value: pizza.price
        },
        {
          name: 'ingredients',
          type: 'text',
          value: pizza.ingredients
        },
        {
          name: 'img',
          type: 'text',
          value: pizza.img
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
            this.httpService.putData(pizza.id, data).subscribe(() => {
              this.httpService.getData()
                .subscribe(items => {
                  this.pizzas = items;
                });
            });
          }
        }
      ]
    });

    await editAlert.present();
  }

  async deletePizza(pizza) {
    const deleteAlert = await this.alertController.create({
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
    await deleteAlert.present();
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
