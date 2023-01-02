import {Component, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  pizzas: any;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData().subscribe(data => {
      this.pizzas = data;
    });
  }
}
