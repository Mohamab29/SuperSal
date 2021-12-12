import { ProductsService } from './../../../services/products.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products: ProductModel[] = [];
  public unsubscribeFromProducts: Unsubscribe;
  public unsubscribeFromUser: Unsubscribe;
  public user: UserModel = new UserModel();
  public productForEdit: ProductModel;

  constructor(
    private notify: NotifyService,
    private productsService: ProductsService,
    private router: Router
  ) {}
  public showSideBar = 'true';
  public productToEdit(value: ProductModel){
    this.productForEdit = value; 
  }
  public handleSideBar() {
    if (this.showSideBar === 'true') {
      this.showSideBar = 'false';
    } else {
      this.showSideBar = 'true';
    }
  }
  public async searchProducts(args: Event) {
    try {
      const value = (args.target as HTMLInputElement).value.trim();
      if (!value) {
        this.products = store.getState().productsState.products;
        return;
      }
      this.products = await this.productsService.findProductsByPattern(value);
    
    } catch (error) {
      this.notify.error(error);
    }
  }
  async ngOnInit() {
    try {
      this.products = await this.productsService.getAllProductsAsync();
      this.unsubscribeFromProducts = store.subscribe(() => {
        this.products = store.getState().productsState.products;
      });
      this.unsubscribeFromUser = store.subscribe(() => {
        this.user = store.getState().authState.user;
      });
    } catch (error: any) {
      this.notify.error(error);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeFromProducts();
    this.unsubscribeFromUser();
  }
}
