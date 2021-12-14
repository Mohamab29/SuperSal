import { ProductsService } from './../../../services/products.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ProductModel } from 'src/app/models/product.model';
import store from 'src/app/redux/store';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { CategoryModel } from 'src/app/models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit, OnDestroy {
  public products: ProductModel[] = [];
  public categories: CategoryModel[] = [];
  public unsubscribeFromProducts: Unsubscribe;
  public unsubscribeFromUser: Unsubscribe;
  public user: UserModel = store.getState().authState.user;
  public productForEdit: ProductModel;

  constructor(
    private notify: NotifyService,
    private productsService: ProductsService,
    private router: Router,
    private http: HttpClient
  ) {}
  public showSideBar = 'true';
  public productToEdit(value: ProductModel) {
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
  public async changeCategory(value: string) {
    this.products = store.getState().productsState.products;
    if (value === 'All') {
        return;
    } else {
      this.products = this.products.filter(
        (product) => product.categoryId === value
      );
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
      this.categories = await this.http
        .get<CategoryModel[]>(environment.categoriesUrl)
        .toPromise();
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        this.router.navigateByUrl('/logout');
      }
      this.notify.error(error);
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeFromProducts();
    this.unsubscribeFromUser();
  }
}
