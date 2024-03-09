import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get('api/products');
  } 

  //http://localhost:8089/api/shoppingCart/addProduct1
    addProductToCart(product: any): Observable<any> { 
    return this.http.post('api/shoppingCart/addProduct',product);
  } 

  ///shoppingCart/removeProduct/
  removeProductFormCart(id: number): Observable<any> {
    return this.http.delete('api/shoppingCart/removeProduct/'+id);
  }

 
  //http://localhost:8089/api/shoppingCart 
  shoppingCardDetail(): Observable<any> {
    return this.http.get('api/shoppingCart');
  }

  //http://localhost:8089/api/shoppingCart/checkout
  checkout(orderDetailL:any): Observable<any> {
    return this.http.post('api/shoppingCart/checkout',orderDetailL);
  }

  ////http://localhost:8089/api/shoppingCart/emptyCartByUser
  emptyCartByUser(){
    return this.http.delete('api/shoppingCart/emptyCartByUser');
  }
}
