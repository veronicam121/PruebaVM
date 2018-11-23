import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { StorageServiceModule } from 'angular-webstorage-service';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    ShoppingCartComponent,
    ProductModalComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    StorageServiceModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
