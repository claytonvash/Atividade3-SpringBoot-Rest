import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { AuthService } from './auth.service';
import { ProductsComponent } from 'app/views/products/products.component';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public findAll() {
    const token = JSON.parse(localStorage.getItem('jwt')).token;

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    return this.http.get(`${environment.baseUrl}/products`, options);
  }

  public save(product: Product) {
    const token = JSON.parse(localStorage.getItem('jwt')).token;

    const options = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };

    return this.http.post(`${environment.baseUrl}/products`, product, options);
  }
}
