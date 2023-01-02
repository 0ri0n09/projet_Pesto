import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
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
          name: 'description',
          type: 'text',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmer',
          handler: (data) => {
            console.log('Confirm Ok', data);
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
          value: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmer',
          handler: (data) => {
            console.log('Confirm Ok', data);
          }
        }
      ]
    });

    await alert2.present();
  }

  async deletePizza() {
    const alert3 = await this.alertController.create({
      header: 'Supprimer une pizza',
      message: 'Cette action ne peut pas être annulée',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmer',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert3.present();
  }

}
