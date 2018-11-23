import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../models/product';
import { EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {

  @Input() modalProduct: Product;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  public countInput = 1;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
  }

  private hideModal() {
    this.countInput = 1;
    this.closeModal.emit(false);
  }

  private addInput(product) {
    if (this.modalProduct.quantity > this.countInput) {
    this.countInput += 1;
    }
    console.log(this.modalProduct);
  }

  private subInput() {
    if (this.countInput > 1) {
      this.countInput -= 1;
    }
  }

  private buyProduct(product: Product, number) {
    product.quantity =  number;
    swal(this.modalProduct.name, 'fue agregado al carrito', 'success');
    this.dataService.addProductToCart(product);
  }
}
