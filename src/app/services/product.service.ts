import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../core/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:3002/bp';

  constructor(private http: HttpClient) { 
  }


  getProducts(){
    return this.http.get(`${this.url}/products`);
  }

  createProduct(data: Product){
    return this.http.post(`${this.url}/products`, data);
  }

  updateProduct(data: Product){
    let id = data.id;
    delete data.id;
    return this.http.put(`${this.url}/products/${id}`, data);
  }

  deleteProduct(id: any){
    return this.http.delete(`${this.url}/products/${id}`);
  }

  verificationProduct(id: any){
    return this.http.get(`${this.url}/products/verification/${id}`);
  }
}
