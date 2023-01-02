import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    return this.http.post('https://ynov.jcatania.io/pesto-pizzas/', data);
  }

  putData(id: string, data: any) {
    return this.http.put(`https://ynov.jcatania.io/pesto-pizzas/${id}`, data);
  }

  getData() {
    return this.http.get('https://ynov.jcatania.io/pesto-pizzas/');
  }

  deleteData(id: string) {
    return this.http.delete(`https://ynov.jcatania.io/pesto-pizzas/${id}`);
  }
}
