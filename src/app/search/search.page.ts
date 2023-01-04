import {Component, OnInit} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {HttpService} from '../services/http.service';
import {Camera} from '@ionic-native/camera/ngx';
import { RefreshService } from '../services/refresh.service';

interface CameraOptions {
  quality?: number;
  destinationType?: number;
  sourceType?: number;
  encodingType?: number;
  mediaType?: number;
  allowEdit?: boolean;
  correctOrientation?: boolean;
  saveToPhotoAlbum?: boolean;
  cameraDirection?: number;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {

  pizzas: any;
  initialPizzas: any;
  camera: Camera;
  constructor(private alertController: AlertController,
              private httpService: HttpService,
              private refreshService: RefreshService) {
  }
  ngOnInit() {
    this.httpService.getData().subscribe(data => {
      this.pizzas = data;
      this.initialPizzas = this.pizzas;
    });
    this.refreshHome();
  }

  refreshHome() {
    this.refreshService.refresh();
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
          placeholder: 'Image (URL)'
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

  addImgPizza(pizza: any) {
    this.camera = new Camera();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      pizza.img = 'data:image/jpeg;base64,' + imageData;
      this.httpService.putData(pizza.id, pizza).subscribe(() => {
        this.httpService.getData()
          .subscribe(items => {
            this.pizzas = items;
          });
      });
    }, (err) => {
      console.log('ERREUR CAMERA');
    });
    this.refreshHome();
  }
}
