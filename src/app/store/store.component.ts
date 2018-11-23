import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})

/* Component that displays the Baraton store */

export class StoreComponent implements OnInit {

  public products: Product[] = [];
  public categories: Category[] = [];
  public subLevel = [];
  public selectedProducts: Product[];
  public showCategory = true;
  public breadcrumb: {}[] = [];
  public modalProduct: Product;
  public countInput = 1;
  public showCart = false;
  public filteredProducts: Product[];
  public searchText: string;
  public prices: any[] = [];
  public showFilters = false;
  public showSearchBar = false;

  // Retrieves the Data from the Service

  constructor(private dataService: DataService) {
    this.dataService.getCategories()
    .subscribe((data) => {
      this.categories = data.categories;
      this.subLevel = this.categories;
    });
    this.dataService.getProducts()
    .subscribe((data) => {
      this.products = data.products;
    });
    this.prices = this.dataService.priceRange;
   }

   ngOnInit() { }

  // Restart values

  private restart() {
    this.subLevel = this.categories;
    this.breadcrumb = [];
    this.selectedProducts = this.filteredProducts = undefined;
    this.showCategory = true;
  }

  // Navigating the Categories

  private selectSubLevel(level) {
    if (level.sublevels !== undefined) {
      this.subLevel = level.sublevels;
      this.breadcrumb.push(level);
    } else {
      this.showCategory = false;
      this.selectProducts(level);
    }
  }

  // Selects the Products from the sublevel

  private selectProducts(level) {
    this.selectedProducts = this.products.filter((product) =>
      product.sublevel_id === level.id
    );
    this.breadcrumb.push(level);
  }

  // Navigating the BreadCrumb

  private goBack(crumb) {
    if (this.breadcrumb[0] === crumb) {
      this.restart();
    } else {
      this.breadcrumb = this.breadcrumb.slice(0, this.breadcrumb.indexOf(crumb));
      this.selectSubLevel(crumb);
      this.selectedProducts = this.filteredProducts = undefined;
      this.showCategory = true;
    }
  }

  // Filter by available products
  public filterByAvailable() {
    this.filteredProducts = this.selectedProducts.filter((product) =>
      product.available === true && product.quantity > 0
    );
  }

  // Filter by price range

  public filterByPrice(low, high) {
    this.filteredProducts = this.selectedProducts.filter((product) => {
      var number = Number(product.price.replace(/[^0-9.-]+/g, ''));
      if (( number <= high) && (number > low)) {
        console.log(product);
        return product;
      }
    });
  }

  // Filter by number of products available

  public filterByStock(lowToHigh: true) {
    if (lowToHigh) {
      this.filteredProducts = this.selectedProducts.sort((a, b) => {
        return a.quantity > b.quantity ? 1 : a.quantity <= b.quantity ? -1 : 0;
      });
    } else {
    this.filteredProducts = this.selectedProducts.sort((a, b) => {
      return a.quantity < b.quantity ? 1 : a.quantity >= b.quantity ? -1 : 0;
      });
    }
  }

  // Resets the filters

  private resetFilter() {
    this.filteredProducts =  undefined;
  }

  // Shows the view more modal

  private showProduct(product) {
    this.modalProduct = product;
  }

  // Toggling the Modal

  private hideModal(close: boolean) {
    this.modalProduct = undefined;
  }

  private hideCart(close: boolean) {
    this.showCart = !this.showCart;
  }
}
