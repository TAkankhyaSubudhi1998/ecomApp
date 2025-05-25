import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public apiURL = 'https://fakestoreapi.com/products'

  constructor(
    private http: HttpClient
  ) { }

  public productList() {
    return this.http.get(this.apiURL)
  }
  public productById(productId: string) {
    return this.http.get(this.apiURL+`/${productId}`)
  }
}
