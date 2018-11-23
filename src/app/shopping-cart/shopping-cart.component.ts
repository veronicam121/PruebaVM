import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../models/product';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @Input() showCart: boolean;
  @Output() closeCart: EventEmitter<any> = new EventEmitter();
  public cartProducts: Product[] = [];
  public total = 0;

  constructor(private dataService: DataService) {
    this.cartProducts =  this.dataService.getCartProducts();
    this.dataService.event_update.subscribe(() => {
      this.updateTotal();
    });
    this.updateTotal();
  }

  ngOnInit() {

  }


  public updateTotal () {
    this.total = 0;
    this.cartProducts.forEach((product) => {
      let price = Number(product.price.replace(/[^0-9.-]+/g, ''));
      this.total = (price * product.quantity) + this.total;
    });
  }

  public hideCart()  {
    this.closeCart.emit(false);
  }


  public subInput(product: Product) {
    product.quantity -= 1;
    this.updateTotal();
  }

  public addInput(product: Product) {
    product.quantity += 1;
    this.updateTotal();
  }

  public deleteProduct(product: Product) {
    let index = this.cartProducts.indexOf(product);
    this.cartProducts.splice(index, 1);
    this.updateCart();
  }

  public updateCart() {
    this.dataService.updateCart(this.cartProducts);
  }

}
