import { Injectable, Inject, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';


const STORAGE_KEY = 'baraton_key';

@Injectable({
  providedIn: 'root'
})

/*
Service for retrieving the data. This App uses static JSON Data instead of API Calls.
It also searchs for the data stored on the browser
*/

export class DataService {

  private categoriesUrl = './assets/data/categories.json';
  private productsUrl = './assets/data/products.json';
  public shoppingCart: Product[] = [];
  // Const Price Range
  public priceRange = [
    { low: 0, high: 5000, value: 'Menos de $5,000'},
    { low: 5000, high: 10000, value: '$5,000 a $10,000'},
    { low: 10000, high: 15000, value: '$10,000 a $15,000'},
    { low: 15000, high: 50000, value: 'Más de $15,000'},
  ];
  public total = [];

  @Output() event_update: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(SESSION_STORAGE) private storage, private http: HttpClient) {
    this.shoppingCart = this.storage.get(STORAGE_KEY) || [];
  }

  public getProducts(): Observable<any> {
    return this.http.get(this.productsUrl);
  }

  public getCategories(): Observable<any> {
    return this.http.get(this.categoriesUrl);
  }

  public addProductToCart(product) {
    this.shoppingCart.push(product);
    this.storage.set(STORAGE_KEY, this.shoppingCart);
    this.event_update.next();
  }

  public getCartProducts() {
    return this.shoppingCart;
  }

  public updateCart(products) {
  this.shoppingCart = products;
  this.storage.set(STORAGE_KEY, this.shoppingCart);
  this.event_update.next();
  }
}
