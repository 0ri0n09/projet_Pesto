import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    return this.http.post('/api/data', data);
  }

  putData(data: any) {
    return this.http.put('/api/data', data);
  }

  getData() {
    return this.http.get('/api/data');
  }

  deleteData(id: string) {
    return this.http.delete(`/api/data/${id}`);
  }
}
