import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.scss'],
})
export class DetailModalComponent implements OnInit {

  @Input() pizza: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.pizza);
  }

  return() {
    return this.modalCtrl.dismiss('cancel');
  }
}
